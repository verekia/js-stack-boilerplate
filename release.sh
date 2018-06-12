# This file is used to generate Github releases, please ignore it.

version='v3.0.0'
name='js-stack-boilerplate-'$version
dir='dist/'$name

rm -rf dist
mkdir dist
mkdir $dir

cp -R public $dir
cp -R src $dir

cp .dockerignore $dir
cp .env-sample $dir
cp .eslintrc.json $dir
cp .flowconfig $dir
cp .gitignore $dir
cp .travis.yml $dir
cp package.json $dir
cp Procfile $dir

cd dist
zip -r -X $name'.zip' $name
rm -rf $name
