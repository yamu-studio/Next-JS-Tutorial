import { ImageResponse } from 'next/og'

export const alt = 'Moment video learning project'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          background: '#e9eee5',
          color: '#244735',
        }}
      >
        <div style={{ fontSize: 112, fontWeight: 700 }}>Moment</div>
        <div style={{ marginTop: 24, fontSize: 28, letterSpacing: 8 }}>
          NEXT.JS LEARNING PROJECT
        </div>
      </div>
    ),
    size,
  )
}
