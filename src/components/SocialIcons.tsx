
import React from 'react';

export const InstagramIcon = ({ size = 24, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth="2" />
        <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.96039 11.7616 8.09206 10.91 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.5 6.5H17.51" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const FacebookIcon = ({ size = 24, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const TikTokIcon = ({ size = 24, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12C9 13.38 8.5 14.6 7.6 15.5C6.7 16.4 5.5 16.9 4.2 16.9C2.9 16.9 1.7 16.4 0.8 15.5C-0.1 14.6 -0.1 13.3 0.8 12.4C1.7 11.5 2.9 11 4.2 11V14C3.7 14 3.2 14.2 2.9 14.5C2.6 14.8 2.6 15.3 2.9 15.6C3.2 15.9 3.7 16 4.2 16C4.7 16 5.2 15.8 5.6 15.5C5.9 15.1 6.1 14.7 6.1 14.2V2H9.1C9.1 3.5 9.6 4.9 10.6 6C11.5 7 12.8 7.7 14.2 7.9V10.9C11.9 10.7 9.8 9.6 8.3 7.8L9 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 7.9C20.1 7.4 19.3 6.7 18.7 5.8C18.1 4.9 17.8 3.9 17.8 2.9H14.8V14.2C14.8 15.5 15.3 16.7 16.2 17.6C17.1 18.5 18.3 19 19.6 19C20.9 19 22.1 18.5 23 17.6C23.9 16.7 24.4 15.5 24.4 14.2V2.9H21.4C21.4 4.7 21.2 6.4 21 7.9Z" fill="currentColor" />
        <path d="M9 12A6 6 0 0 0 3 18 A6 6 0 0 0 9 24 A6 6 0 0 0 15 18V2H12V18A3 3 0 0 1 9 21A3 3 0 0 1 6 18A3 3 0 0 1 9 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Simplified TikTok path because standard one is complex */}
        <path d="M21 8V2H18C16.3431 2 15 3.34315 15 5V14C15 16.7614 12.7614 19 10 19C7.23858 19 5 16.7614 5 14C5 11.2386 7.23858 9 10 9V12C8.89543 12 8 12.8954 8 14C8 15.1046 8.89543 16 10 16C11.1046 16 12 15.1046 12 14V2H15C15 3.65685 16.3431 5 18 5V8H21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
// Re-doing TikTok to be cleaner standard path
export const TikTokIconClean = ({ size = 24, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 8V2H18C16.3431 2 15 3.34315 15 5V14C15 16.7614 12.7614 19 10 19C7.23858 19 5 16.7614 5 14C5 11.2386 7.23858 9 10 9V12C8.89543 12 8 12.8954 8 14C8 15.1046 8.89543 16 10 16C11.1046 16 12 15.1046 12 14V2H15C15 3.65685 16.3431 5 18 5V8H21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ShareIcon = ({ size = 24, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 6L12 2L8 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2V15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const XIcon = ({ size = 24, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4L11 12.5L3.5 21H5L12 13.5L17.5 21H21L13.5 11.5L20.5 3H19L12.5 10.5L6.5 3H4Z" fill={color} />
    </svg>
);

export const LinkIcon = ({ size = 24, color = 'currentColor' }: { size?: number, color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
