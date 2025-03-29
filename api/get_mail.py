#!/usr/bin/env python3
import imaplib
import email
import os
import datetime
import time
import logging
from email.header import decode_header
import configparser
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('mail_poller')

class EmailPoller:
    def __init__(self, config_file='config.ini'):
        # Read configuration
        self.config = self._read_config(config_file)
        
        # Create storage directory if it doesn't exist
        self.storage_dir = Path('./storage/mail/raw')
        self.storage_dir.mkdir(parents=True, exist_ok=True)
        
        # IMAP connection details
        self.imap_server = self.config.get('imap', 'server')
        self.imap_port = int(self.config.get('imap', 'port', fallback='993'))
        self.username = self.config.get('imap', 'username')
        self.password = self.config.get('imap', 'password')
        self.mailbox = self.config.get('imap', 'mailbox', fallback='INBOX')
        self.use_ssl = self.config.getboolean('imap', 'use_ssl', fallback=True)
    
    def _read_config(self, config_file):
        """Read configuration from file or create a default one if not exists"""
        config = configparser.ConfigParser()
        
        config_path = Path(config_file)
        if not config_path.exists():
            logger.warning(f"Configuration file {config_file} not found. Creating default configuration.")
            config['imap'] = {
                'server': 'imap.example.com',
                'port': '993',
                'username': 'your_email@example.com',
                'password': 'your_password',
                'mailbox': 'INBOX',
                'use_ssl': 'True'
            }
            
            # Create directory for config if needed
            config_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Write default config
            with open(config_file, 'w') as f:
                config.write(f)
            
            logger.info(f"Default configuration created at {config_file}. Please update with your credentials.")
            return config
        
        config.read(config_file)
        return config
    
    def connect(self):
        """Connect to the IMAP server"""
        try:
            if self.use_ssl:
                self.mail = imaplib.IMAP4_SSL(self.imap_server, self.imap_port)
            else:
                self.mail = imaplib.IMAP4(self.imap_server, self.imap_port)
            
            self.mail.login(self.username, self.password)
            logger.info(f"Successfully connected to {self.imap_server}")
            return True
        except Exception as e:
            logger.error(f"Failed to connect to IMAP server: {str(e)}")
            return False
    
    def disconnect(self):
        """Disconnect from the IMAP server"""
        try:
            self.mail.close()
            self.mail.logout()
            logger.info("Disconnected from IMAP server")
        except Exception as e:
            logger.error(f"Error during disconnection: {str(e)}")
    
    def get_emails_last_24h(self):
        """Fetch emails from the last 24 hours"""
        # Select the mailbox
        status, messages = self.mail.select(self.mailbox)
        if status != 'OK':
            logger.error(f"Failed to select mailbox {self.mailbox}")
            return []
        
        # Calculate date for 24 hours ago
        date = (datetime.datetime.now() - datetime.timedelta(days=1)).strftime("%d-%b-%Y")
        
        # Search for emails since date
        status, messages = self.mail.search(None, f'(SINCE {date})')
        if status != 'OK':
            logger.error("Failed to search for messages")
            return []
        
        email_ids = messages[0].split()
        logger.info(f"Found {len(email_ids)} emails in the last 24 hours")
        
        return email_ids
    
    def save_email(self, email_id):
        """Save a single email to the storage directory"""
        status, msg_data = self.mail.fetch(email_id, '(RFC822)')
        if status != 'OK':
            logger.error(f"Failed to fetch message {email_id}")
            return False
        
        raw_email = msg_data[0][1]
        
        # Parse the raw email
        msg = email.message_from_bytes(raw_email)
        
        # Extract subject for filename
        subject = decode_header(msg["Subject"])[0][0]
        if isinstance(subject, bytes):
            subject = subject.decode()
        
        # Clean subject for filename
        subject = "".join(c if c.isalnum() else "_" for c in subject)
        
        # Generate filename with timestamp and message ID
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        msg_id = msg.get("Message-ID", "").strip("<>").replace("@", "_at_")
        if not msg_id:
            msg_id = email_id.decode()
        
        filename = f"{timestamp}_{subject}_{msg_id}.eml"
        filepath = self.storage_dir / filename
        
        # Save raw email
        with open(filepath, 'wb') as f:
            f.write(raw_email)
        
        logger.info(f"Saved email: {filepath}")
        return True
    
    def poll_emails(self):
        """Main function to poll emails and save them"""
        if not self.connect():
            return False
        
        try:
            email_ids = self.get_emails_last_24h()
            for email_id in email_ids:
                self.save_email(email_id)
            
            return True
        except Exception as e:
            logger.error(f"Error polling emails: {str(e)}")
            return False
        finally:
            self.disconnect()

def main():
    """Main entry point"""
    poller = EmailPoller()
    poller.poll_emails()

if __name__ == "__main__":
    main()
