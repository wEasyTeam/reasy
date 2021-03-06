REM 请将这段代码保存到bat格式的文件中执行

@echo off
@chcp 65001
CLS
::用于解决uft8在控制台输出中文乱码的问题
goto :START
exit

:IF_EXIST
SETLOCAL&PATH %PATH%;%~dp0;%cd%
if "%~$PATH:1"=="" exit /b 1
exit /b 0   


:CHECK
call :IF_EXIST node.exe
if %errorlevel%==1 (
    echo 你的系统没有安装nodejs,无法进行自动安装　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 
    goto :EXIST
)

call :IF_EXIST reasy.cmd
if %errorlevel%==1 (
    echo 你的系统没有安装reasy编译工具，正在自动安装，可能需要数分钟　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 
    call npm install -g reasy --registry=https://registry.npm.taobao.org
    call npm install -g web-debug --registry=https://registry.npm.taobao.org

    call :IF_EXIST reasy.cmd || echo reasy编译工具安装失败　　　　　　　　　　　　　　　　　　　　　　　　　 
) else (
	echo 编译中...　　　　　　　　　　　　　　　　　　　　　　　　　 
)
goto :COMPILE

:START
call :CHECK
goto :EOF

:EXIST
pause
goto :EOF

:COMPILE
call reasy -r ./demo -R parse,relative,compress
goto :EXIST
