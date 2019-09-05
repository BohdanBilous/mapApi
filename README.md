# veermo

git clone git@bitbucket.org:dops_digital_/veermo.git

cd veermo

npm install -g gulp-cli

npm install

gulp build

gulp

# directory structure

/assets - place here json and other special assets

/css/fonts - place fonts here

/dist - your output build going here

/images - place images here

/js - general Javascript libraries and helpers

/js/modules/ - page-specific scripts

/partials - html partials to include in other pages, usually page-specific content

/sass - styles here

/vendor - third-party libraries

/video - place your videos here

/workers - web workers (but place Service Workers to root)

#Порядок міграції на сервери замовника треба:

1) налаштувати докер на сервері замовника

1.1) запустити докер контейнер зі Strapi CMS [https://medium.com/strapi/strapi-quickstart-with-docker-d77ca7c86c1f]

2) скопіювати папки db та strapi-app що лежать поруч з Dokerfile (з http://veermocms.dops.digital/) на сервак замовника 

3) перенести фронт з veermo.dops.digital на сервак замовника

4) оновити адреси cms-сервера на фронті

#Veermo Wiki

https://bitbucket.org/dops_digital_/veermo/wiki/Home

