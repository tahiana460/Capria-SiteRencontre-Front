// import { MiddlewareHandler } from 'astro';

// export const onRequest = async function onRequest(
//  	{ locals, request ,redirect },
//  	next,
//  ) {
//  	const { url } = request;
//      //console.log(url)
//  	const { pathname,searchParams } = new URL(url);
//     //console.log(pathname)
//     //console.log(searchParams)
//  	const timestamp = new Date().toISOString();
//     if(pathname=='/accueil' || pathname=='/assistance' || pathname=='/chat' || pathname=='/profile'){
        
//         if(searchParams.get('id') && pathname=='/accueil'){
//             //console.log('path with id')
//             const response = await next();
//             return response;
//         }
//         else if(localStorage.getItem('user')){
//             const response = await next();
//             return response;
//         }else{
//             return redirect('/login');
//         }
//     }else{
//         const response = await next();
//         return response;
//     }
//  	(locals).timestamp = timestamp;
//  	const response = await next();
//  	//return response;

//  };