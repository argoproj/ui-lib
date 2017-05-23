#!/bin/bash

ROOT=$(dirname "${BASH_SOURCE}")

rm src/assets/fonts/* &&
    node $ROOT/icon-generator.js && mv ./src/assets/fonts/ax-icon-v1.css ./src/assets/styles/_ax-icons-auto.scss &&
    sed -i -e 's/\"ax-icon-v1[.]/\".\/assets\/fonts\/ax-icon-v1./g' ./src/assets/styles/_ax-icons-auto.scss &&
    rm ./src/assets/styles/_ax-icons-auto.scss-e