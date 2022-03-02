const argv = require('./configs/yargs');
const colors = require('colors');
const openQuantityBrowser = require('./helpers/openBrowser'); 
const axios = require('axios');

const post = function ( url, data, callback ) {
    return new Promise ( (resolve, reject) => {
        
            axios.post(url,  data)
            .then(function (response) {            
                callback();                
                resolve(`${ response.status } - ${ response.statusText } `.green);
            })
            .catch(function (error) {            
                callback();                
                reject (`Error: ${error.response.status} - ${ error.response.statusText } |||| ${error.response.data}`.red);
            });
    })
    
    
}

const insertDevice = async ( name, password ) => {

    let data = '';
    console.log('Creating devices...'.blue);    

    for (let i = (0 + argv.from ); i < (argv.quantity + argv.from); i++) {         
        data = `CLIENTE=1000&DEVICE=${ name }${ i }&CLAVE=${ password }&FECHA_EXPIRACION=2023-02-28&CONFIGURACION=host%3D%27dynamic%27%2Cdisallow%3D%27all%27%2Callow%3D%27ulaw%3Balaw%3Bg729%27%2Cdtmfmode%3D%27rfc2833%27%2Clanguage%3D%27es%27%2Cnat%3D%27yes%27%2Crtpkeepalive%3D30%2Crtptimeout%3D60%2Crtpholdtimeout%3D600%2Csendrpid%3D%27no%27%2Cinsecure%3D%27port%3Binvite%27&ENABLED=true&CANALES_MAX=1&TASA_DISCADO_MAXIMA=0&TIPO_ASTERISK=SIP&TIPO_NEOTEL=NeoPosition&PROVEEDOR=&EXTRAER=0&ANTEPONER=&CALLERID_DEFAULT=&CALLERID_RANGE=&DESCRIPCION=${ name }${ i }-wrtctester`; 

        try {

            console.log(await post(`http://${argv.wip}/neoapi/webservice.asmx/Device_Insert`, data, callback = () => {            
                console.log(`Creating device ${ name }${ i }`);
            }));        

        } catch (err) {
            console.error(err);
            //throw err;
        }   
    }   

    return 'Devices creation complete.';
}


const deleteDevices = async ( name ) => {
    let data = '';            
    console.log('Deleting devices...'.blue);
    
    for (let i = (0 + argv.from ); i < (argv.quantity + argv.from); i++) {
        data = `CLIENTE=1000&DEVICE=${ name }${ i }`;  
        
        try {

            console.log (await post(`http://${argv.wip}/neoapi/webservice.asmx/Device_Delete`, data, callback = () => {
                console.log(`Deleting device ${ name }${ i }`);
            }));            

        } catch (err) {
            //throw err;
            console.error(err);
        }        
    }    

    return 'Devices Deletion complete.';
}

const insertUsers = async ( quant ) => {
    let data = '';        
    console.log('Starting user creation'.blue);
    
    for (let i = (1001 + argv.from); i < (quant + argv.from + 1001); i++) {
        data = `CLIENTE=1000&USUARIO=${ i }&CLAVE=2022&TIPO=CCE&GRABA_CONVERSACION=false&DETECTA_PALABRAS=false&EMAIL=&TELEFONO=&NOMBRE=wrtctest${ i }&APELLIDO=wrtctest${ i }&CAMBIA_CLAVE_PROX_LOGIN=false&SAL_CALLERID_PRESENTATION=0&SAL_CALLERID=0&SAL_RUTA=0&SAL_PRECIO=0&ENT_DNIS=&ENT_TIMEOUT=30&ENT_LOCUCION=0&FECHA_ALTA=2023-02-28&DOMICILIO=&LOCALIDAD=&DNI=&IDPERFIL=1&VERIFICA_PERMISOS=true`;        

        try {            

            console.log( await post(`http://${argv.wip}/neoapi/webservice.asmx/User_Insert`, data, callback = () => {
                console.log(`Creating user ${ i }`);
            }));

        } catch (err) {
            //throw err;
            console.log(err);
        }        
    }    
    return 'User creation complete.';
}

const deleteUsers = async ( quant ) => {
    let data = '';        
    console.log('Deleting users...');
    
    for (let i = (1001 + argv.from); i < (quant + argv.from + 1001); i++) {
        data = `CLIENTE=1000&USUARIO=${ i }`;    
        
        try {

            console.log( await post(`http://${argv.wip}/neoapi/webservice.asmx/User_Delete`, data, callback = () => {
                console.log(`Deleting user ${ i }`);
            }));   

        } catch (err) {
            console.error(err);
        }
    }    
    return 'Users deletion complete.';
}

const userLogin = async ( quant ) => {
    let data = '';        
    console.log('Start user login'.blue);
    
    for (let i = (1001 + argv.from); i < (quant + argv.from + 1001); i++) {                
        data = `DEVICE=SIP%2F${ argv.displayName }${ i - 1001 }&USUARIO=${i}&CLAVE=2022`;

        try {

            console.log(await post(`http://${argv.wip}/neoapi/webservice.asmx/Login`, data, callback = () => {
                console.log(`Logging in user ${ i }...`);
            }));

        } catch (err){
            console.error(err);
        }
          
    }    
    return 'Login users complete.'
}

const getUrl = (id, argv) => {

    const url = `${ argv.url }?displayName=${ argv.displayName }${ id }&privateIdentity=${ argv.privateIdentity }${ id }&publicIdentity=sip:${ argv.privateIdentity }${ id }@${ argv.publicIdentity }&realm=${ argv.realm }&password=${ argv.password }&test=${ argv.testmode }&websocket_proxy_url=${ argv.websocket_proxy_url }&outbound_proxy_url=${ argv.outbound_proxy_url }&ice_servers=${ argv.ice_servers }&enable_rtcweb_breaker=${ argv.enable_rtcweb_breaker }&enable_early_ims=${ argv.enable_early_ims }&enable_media_stream_cache=${ argv.enable_media_stream_cache }&bandwidth=${ argv.bandwidth }&video_size=${ argv.video_size }`;
    console.log('URL generated for ' + `id ${ id } = ${ url }`.blue);
    return url;

}

const openBrowsers = function (argv, callback) {    

    for (let i = (0 + argv.from ); i < (argv.quantity + argv.from ); i++) {
        callback(i);
        openQuantityBrowser(argv.browser, getUrl(i, argv));
    }

}

//==========================================================//

if(argv.devicecreate && (!argv.devicedelete)) {    
        
    insertDevice(argv.displayName, argv.password)
        .then( msg => console.log(msg.green))
        .catch (err => console.log(err));       
}

if (argv.devicedelete) {    
    deleteDevices(argv.displayName)
        .then( msg => console.log(msg.green))
        .catch (err => console.log(err));    
}

if (argv.usercreate && (!argv.userdelete)) {    
    insertUsers(argv.quantity)
        .then( msg => console.log(msg.green))
        .catch (err => console.log(err));    
}

if (argv.userdelete) {
    deleteUsers(argv.quantity)
        .then( msg => console.log(msg.green))
        .catch (err => console.log(err));        
}

if (argv.browser){
    openBrowsers(argv, callback = (id) => {
        console.log(`Open Browser for id ${id}`.green);
    });
}

if (argv.userlogin) {    
    userLogin(argv.quantity)
        .then( msg => console.log(msg.green))
        .catch (err => console.log(err));    ;
}

//node app --dn wrtctest --pri wrtctest --pbi 190.189.184.65 -r 172.16.9.7 -p bFd3EmLFgRpkJYpZfjqy --wsp wss://s5.neotel.us:443 --quantity 1 -u https://34.138.56.157/ecrm/sipml5-master/calltest.htm --br 'chrome' --wip 34.138.56.157 --usercreate true --userlogin true