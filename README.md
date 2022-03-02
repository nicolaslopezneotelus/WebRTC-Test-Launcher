# WebRTC-Test-Launcher

<p>Calltest.htm load the configuration parameters from URL, in contrast to call.htm that load the configuration parameters from local storage. 
Execute node app to automatic generate URL and open browsers.</p>

<p>node app --help to obtain more information.</p>

--dn dispalyName <br>
--pri Private Identity <br>
--pbi Public Identity <br>
-r realname <br>
-p password <br>
--wsp wss://domain:port <br>
--quantity number of operations <br>
-u https://x.x.x.x/ecrm/sipml5-master/calltest.htm <br>
--wip WebService API IP Address <br>
--devicecreate True/False for device creation <br>
--usercreate True/False for user creation <br>
--userlogin True/False for user logins<br>
--devicedelete True/False for device deletion <br>
--userdelete True/False for user deletion  <br>
--browser msedge/chrome/firefox/opera<br>

node app --dn wrtctest --pri wrtctest --pbi 190.189.184.65 -r 172.16.9.7 -p bFd3EmLFgRpkJYpZfjqy --wsp wss://s5.c2x.com.br:443 --quantity 1 -u https://34.138.56.157/ecrm/sipml5-master/calltest.htm --wip 34.138.56.157 --devicecreate false --usercreate false --userlogin true --devicedelete false --userdelete false --browser msedge
