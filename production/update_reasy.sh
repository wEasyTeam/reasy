#!/bin/bash
#可以将该脚本放在任意目录执行
#执行方法:
#chmod +x ./update_reasy.sh
#./update_reasy.sh


NODE_VERSION="v0.12.7"
SVN_SERVER_IP=192.168.98.20
SVN_SERVER_ROOT=svn://$SVN_SERVER_IP/web-tool/reasy-linux32/reasy
dir=reasy
ROOT=$(pwd)/$dir #本地reasy工具链目录



function init_environment() {
	if [ ! -d $ROOT ] ; then
	    mkdir $ROOT -p
	fi

	PATH=$ROOT/bin:$ROOT:$PATH
	export PATH

	echo 'Tmp environment variable is:'
	echo '----------------------------------------------------------'
	echo $PATH
	echo '----------------------------------------------------------'
}

function svn_co() {
	svn cleanup
    svn co $SVN_SERVER_ROOT $ROOT
    chmod 777 -R $ROOT
    echo reasy工具链下载完成，正在连网更新...
    return;
}

function svn_ci() {
	cd $dir
	echo 正在将$(pwd)更新至服务器...
	svn status|grep \?|awk '{print $2}'|xargs svn add  #给新增的文件打上A标记
	svn status|grep \!|awk '{print $2}'|xargs svn del  #给删除了的文件打上D标记
	svn cleanup
    svn ci --username reasy --password reasy -m "更新reasy" 
    echo !!!服务器更新成功!!!
}

function check_network()
{
    ping_res=$(ping $1  -c 3|grep "3 received, 0% packet loss")
    if [ "$ping_res" == "" ]
    then
        echo "check network ..........fail!"
        return 0;
    else
        echo "check network ..........ok!"
        return 1;
    fi
}

function co_origin() {
	echo checkout from $SVN_SERVER_ROOT to $ROOT ...
    check_network $SVN_SERVER_IP
    if [ $? -eq 0 ]
    then 
        echo 网络故障，无法连接192.168.98.20
        exit 0
    fi

    svn_co 
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
	if [ ! -e $dir/$nodegz ]; then
		echo "start downloadding..."
		wget ${downloadUrl}
		cp $nodegz $dir/ -f
		rm -rf $nodegz
	fi
	echo "extracting..."
	tar -xzf $dir/${nodegz} -C .
	cp $nodeDir/* $dir -R
	rm -rf $nodeDir

	chmod 777 $ROOT -R
}


function install_reasy() {
	npm install -g reasy --registry=https://registry.npm.taobao.org
}

function check() {
	install_node
	install_reasy
}


function show_version() {
	reasy -v
}

init_environment
#co_origin #从svn上下载原始版本
if ([ $? -eq 0 ]) then
	check  #通过npm连网更新reasy
	show_version #显示版本号
	svn_ci  #上传回svn，完成更新
else
	echo !!!连接${SVN_SERVER_IP}出错!!!
fi



