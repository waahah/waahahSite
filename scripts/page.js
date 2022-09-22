hexo.extend.filter.register('theme_inject', function(injects) {
  //injects.header.file('default', 'source/_inject/test1.ejs', { key: 'value' }, -1);
  injects.bodyBegin.file('default', "source/_inject/bodyBegin.ejs");
  injects.header.file('video-banner', 'source/_inject/header.ejs', { key: 'value' }, -1);
});