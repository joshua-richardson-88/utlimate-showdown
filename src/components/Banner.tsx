const Banner = () => (
  <div className='flex w-full items-center text-white px-5 py-8 bg-neutral-500'>
    <a href='https://passage.id/'>
      <div className="w-[60px] h-[60px] cursor-pointer bg-[url('https://storage.googleapis.com/passage-docs/passage-logo-dark.svg')] bg-no-repeat"></div>
    </a>
    <div className='my-[10px] text-xl'>Passage + Next.js Example App</div>
    <div className='flex-grow'></div>
    <a
      href='htts://passage/id/'
      className='ml-5 text-white underline decoration-white'
    >
      {' '}
      Go to Passage
    </a>
  </div>
)

export default Banner
