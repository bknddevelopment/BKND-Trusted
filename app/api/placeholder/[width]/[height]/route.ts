import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { width: string; height: string } }
) {
  const width = parseInt(params.width) || 600;
  const height = parseInt(params.height) || 400;

  // Validate dimensions
  if (width > 3840 || height > 2160 || width < 1 || height < 1) {
    return new NextResponse('Invalid dimensions', { status: 400 });
  }

  // Create an SVG placeholder image
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#e5e7eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#d1d5db;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#gradient)"/>
      <text
        x="50%"
        y="50%"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="${Math.min(width, height) * 0.06}px"
        fill="#6b7280"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${width} × ${height}
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}