import {useEffect} from 'react'


const Notfound = () => {
    useEffect(() => {
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);
    }, [])
  return (
    <div className='h-full flex items-center justify-center'>
        <div className='flex flex-col justify-center items-center gap-4'>
        <img src='/images/error-404.png' alt='Not found' className='w-48 h-48 ' />
        <div>
        <h1 className='text-lg font-semibold text-gray-600 m-0'>ไม่พบหน้าที่คุณต้องการ</h1>
         <p className='text-sm font-semibold text-gray-600 m-0'>
            กำลังพาคุณกลับสู่หน้าหลัก...
        </p>
              </div>
          </div>
    </div>
  )
}

export default Notfound