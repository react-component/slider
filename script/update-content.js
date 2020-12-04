/*
  用于 dumi 改造使用，
  可用于将 examples 的文件批量修改为 demo 引入形式，
  其他项目根据具体情况使用。
*/

const fs = require('fs');
const glob = require('glob');

const paths = glob.sync('./docs/examples/*.jsx');

paths.forEach(path => {
  const name = path.split('/').pop().split('.')[0];
  fs.writeFile(
    `./docs/demo/${name}.md`,
    `## ${name}

<code src="../examples/${name}.jsx">
`,
    'utf8',
    function(error) {
      if(error){
        console.log(error);
        return false;
      }
      console.log(`${name} 更新成功~`);
    }
  )
});
