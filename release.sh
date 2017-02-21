# This file is used to generate Github releases, please ignore it.

name='js-stack-boilerplate-v2.4.0'
dir='dist/'$name

rm -rf dist
mkdir dist
mkdir $dir

cp -R src $dir
cp -R public $dir

cp .babelrc $dir
cp .eslintrc.json $dir
cp .flowconfig $dir
cp .gitignore $dir
cp package.json $dir
cp webpack.config.babel.js $dir
cp yarn.lock $dir

cd dist
zip -r -X $name'.zip' $name
rm -rf $name
