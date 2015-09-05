#!/bin/bash

NODE_VERSION="v0.12.7"

function set_root() {
    read -p "Which dir you want to install:($(pwd))?  " dir
    if [ "$dir" = "" ]; then
        dir=$(pwd)
    fi

    if [ ${dir:0:1} != "/" ]; then 
        dir=$(pwd)/${dir}
    fi

    dir=$dir/reasy

    if [ -d $dir ] && [ $dir != $(pwd) ]; then 
        read -p "\"$dir\" is already exist! are you sure to install in this?(y/n) " answer
        if [ "$answer" != "y" ]; then
            set_root
        else 
            echo "reasy will install in \"${dir}\""
        fi
    else 
        echo "reasy will install in \"${dir}\""
    fi
}


function init_environment() {
    ROOT=$dir #reasy工具链目录
    if [ ! -d $ROOT ] ; then
        mkdir $ROOT -p
    fi
    cd $ROOT

    PATH=$ROOT/bin:$ROOT:$PATH
    export PATH

    echo 'Tmp environment variable is:'
    echo '----------------------------------------------------------'
    echo $PATH
    echo '----------------------------------------------------------'
}



function install_node() {
    local version=$NODE_VERSION
    local arch=$(uname -a)
    local res=$(expr match "$arch" ".*x86_64")

    if [ $res -gt 0 ]; then
        local nodeDir="node-${version}-linux-x64"
    else 
        local nodeDir="node-${version}-linux-x86"
    fi


    local nodegz="${nodeDir}.tar.gz"
    local downloadUrl="https://nodejs.org/dist/${version}/${nodegz}"

    echo "check if exist \"${nodegz}\""
    if [ ! -e $nodegz ]; then
        echo "start downloadding..."
        wget ${downloadUrl}
        if [ ! -e $nodegz ]; then
            echo "download error!"
            return 9;
        fi
    fi
    echo "extracting..."
    tar -xzf ${nodegz}
    mv ${nodeDir}/* .
    rm -rf ${nodeDir}

    chmod 777 $ROOT -R
}


function install_reasy() {
    npm install -g reasy --registry=https://registry.npm.taobao.org
}

function check() {

    if (test -e bin/npm) then 
        if (test -e bin/reasy) then
            echo "reasy has already install in this path!"
            return 1;
        else 
            if [ "$1" == "reasy" ]; then
                return 9;
            fi
            echo "reasy installing ...!"
            install_reasy
            check "reasy"
        fi
    else
        if [ "$1" == "node" ]; then
            return 9;
        fi
        install_node
        check "node"
    fi
}


function show_version() {
    reasy -v
}

set_root
init_environment
check

if ([ $? -eq 9 ]) then
    echo "Install failed"
else 
    show_version
fi

