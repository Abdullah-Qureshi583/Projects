// // middleware.jsimport { NextResponse } from 'next/server';

// export async function middleware(request) {
//   const { pathname } = request.nextUrl;

//   // Check if the path matches a short code (e.g., /shortcode)
//   const shortCode = pathname.split('/')[1];  // Example: /shortcode

//   // Call your function to check the short URL and update the count
//   const result = await checkShortAndUpdateCount(shortCode);

//   if (result && result.success && result.longUrl) {
//     // Redirect to the long URL if it exists in the DB
//     return NextResponse.redirect(result.longUrl);
//   }

//   // If no result, redirect to a fallback (e.g., home page)
//   return NextResponse.redirect('/');
// }
