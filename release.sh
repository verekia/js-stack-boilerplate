# This file is used to generate Github releases, please ignore it.

name='js-stack-boilerplate-v2.4.0'
dir='dist/'$name

rm -rf dist
mkdir dist
mkdir $dir

cp -R public $dir
cp -R src $dir

cp .babelrc $dir
cp .coveralls.yml $dir
cp .env-sample $dir
cp .eslintrc.json $dir
cp .flowconfig $dir
cp .gitignore $dir
cp .travis.yml $dir
cp app.json $dir
cp package.json $dir
cp Procfile $dir
cp webpack.config.babel.js $dir
cp yarn.lock $dir

cd dist
zip -r -X $name'.zip' $name
rm -rf $name
