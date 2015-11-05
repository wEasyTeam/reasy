#!/bin/bash

function install(){ 
    npm install -g reasy
    echo "You have already install reasy! Start to enjoy it!"
}

function showVersion() {
    reasy -v
}

function check() {
if (which npm > /dev/null 2>&1) then    
  if (which reasy > /dev/null 2>&1) then
      echo "reasy has already install on the system!"
  else 
      echo "reasy installing ...!"
      install
  fi
else
    echo "You should install npm first!"
    return 9
fi
}

check

if ([ $? -eq 9 ]) then
    
   echo "and then excute the scrtip again!"
else 
   showVersion
fi

