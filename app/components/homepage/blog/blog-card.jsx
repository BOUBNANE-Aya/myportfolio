// @flow strict
import { timeConverter } from '@/utils/time-converter';
import Image from 'next/image';
import Link from 'next/link';
import { BsHeartFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';

function BlogCard({ projectsData }) {

  // detect gif by extension (case-insensitive)
  const isGif = typeof projectsData.image === 'string' && projectsData.image.toLowerCase().endsWith('.gif');

  return (
    <div className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group"
    >
      <div className="h-44 lg:h-52 w-auto cursor-pointer overflow-hidden rounded-t-lg">
        {
          isGif
            ? (
              // use plain img for GIFs to preserve animation and avoid Next.js optimization issues
              <img
                src={projectsData.image}
                alt={projectsData.title || ''}
                className='h-full w-full object-cover group-hover:scale-110 transition-all duration-300'
                loading="lazy"
              />
            )
            : (
              // for other image types continue using next/image (keeps optimization)
              <Image
                src={projectsData.image}
                height={1080}
                width={1920}
                alt={projectsData.title || ''}
                className='h-full w-full group-hover:scale-110 transition-all duration-300 object-cover'
              />
            )
        }
      </div>
      <div className="p-2 sm:p-3 flex flex-col">
        <div className="flex justify-between items-center text-[#16f2b3] text-sm">
          <p>{timeConverter(projectsData.date)}</p>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1">
              <span>{projectsData.duration}</span>
            </p>
          </div>
        </div>
        <Link target='_blank' href={projectsData.url}>
          <p className='my-2 lg:my-3 cursor-pointer text-lg text-white sm:text-xl font-medium hover:text-violet-500'>
            {projectsData.title}
          </p>
        </Link>
        <p className='mb-2 text-sm text-[#16f2b3]'>
          {`${projectsData.customer}`}
        </p>
        <p className='text-sm lg:text-base text-[#d3d8e8] pb-3 lg:pb-6 line-clamp-3'>
          {projectsData.description}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;