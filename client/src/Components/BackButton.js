import React from 'react'
import history from '../../history'


const BackButton = () => {
    return (
        <img src="https://s3-alpha-sig.figma.com/img/8d30/ec77/acdf8900836c1950d66caa7fac06b208?Expires=1573430400&Signature=cfe74U6AzWRcDhPU8Ql7HK4fyZukvAc3qbVXaRRVNK427rgnLExAQC7Jwz-fmaK~BT4tXMlVXUi-Jx2jkcRi3MF7ulHZ9KroYsdAirqcAhhblywBovau-KrefttvD1R4dIGhU-HnY7ANMS7jUxglaEIiMx~fo2Sk4NxTWU43~gKGLnJyX8gLzYToH-ykip-M1udKt4-wLOAQeFuKdrxzVObL79ktB3lAGykc8vNH4l3URgy7hhKNHgcR-CwIXbpU43DfLqxPD0JCZ3KdmQk~U8jK1BG484EsTzAyFpyohnhtuvBrZs-htlS0XehCzaQKFv0axbkqmuU1pUUlwzcSFw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="back button" className="icon"onClick={() => history.goBack()}/>
    )
}
export default BackButton