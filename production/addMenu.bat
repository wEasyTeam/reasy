@echo string
< "%~f0" more +5 > tmp.reg
regedit /s tmp.reg 
pause
del tmp.reg 
echo Ìí¼Ó³É¹¦
pause
goto :eof
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\Folder\shell\Reasy release\command]
@="\"cmd.exe\" \"/k title Reasy release&&cd %1&&reasy -r %1 --contextmenu\""