import bgImages from '../../utils/bgImages';

export default function PictureBlock({
  flip = false,
  imageSrc = bgImages['governance & consensus'],
  icon,
  title,
  subtitle,
  text,
  button,
}) {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col m-4 overflow-hidden bg-white sm:flex-row rounded-2xl">
        <img
          className={`object-cover max-h-64 sm:max-h-96 ${
            flip ? '' : 'sm:order-last'
          } sm:w-1/2`}
          src={imageSrc}
        />
        <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center sm:w-1/2">
          {icon}
          <h2 className="text-2xl">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
          <p>{text}</p>
          {button && (
            <>
              <hr className="w-full" />
              {button}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
