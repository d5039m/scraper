#! /usr/bin/bash

git pull

echo 'Pull complete'

forever restart source.js

echo 'Forever restarted'
