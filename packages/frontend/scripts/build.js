const copyPublicFolder = () => {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
  
  // Copy static error pages if they exist
  const error403Path = path.resolve(paths.appPublic, '403.html');
  const error404Path = path.resolve(paths.appPublic, '404.html');
  
  if (fs.existsSync(error403Path)) {
    fs.copySync(error403Path, path.resolve(paths.appBuild, '403.html'));
    console.log('Copied 403.html to build directory');
  }
  
  if (fs.existsSync(error404Path)) {
    fs.copySync(error404Path, path.resolve(paths.appBuild, '404.html'));
    console.log('Copied 404.html to build directory');
  }
}; 