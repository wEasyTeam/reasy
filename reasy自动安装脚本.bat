@echo off
goto :START
exit

:IF_EXIST
SETLOCAL&PATH %PATH%;%~dp0;%cd%
if "%~$PATH:1"=="" exit /b 1
exit /b 0   

:CHECK
call :IF_EXIST node.exe
if %errorlevel%==1 (
    echo 你的系统没有安装node,无法进行编译
    pause
    exit
)

call :IF_EXIST reasy.cmd
if %errorlevel%==1 (
    echo 你的系统没有安装reasy编译工具，正在自动安装 ,可能需要数分钟
    npm install -g reasy --registry=https://registry.npm.taobao.org
    echo reasy编译工具安装成功
)
goto :EXIST


:START
call :CHECK
call reasy -v
pause

:EXIST
exit /b 0