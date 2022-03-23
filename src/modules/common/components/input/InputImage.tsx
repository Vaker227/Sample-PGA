import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IImageInfo } from '../../../../models/product';
import { defaultImage } from '../../../../utils/constants';

interface ImageViewProps {
  imageInfo: IImageInfo;
  onRemove(imageInfo: IImageInfo): void;
}

const ImageView = (props: ImageViewProps) => {
  const { imageInfo, onRemove } = props;
  return (
    <div className="relative h-[120px] w-[120px] shrink-0 bg-white">
      <div
        className="absolute -top-2 -right-2 grid h-6 w-6 cursor-pointer place-content-center rounded-full bg-gray-200 hover:bg-gray-100"
        onClick={() => onRemove(imageInfo)}
      >
        <i className="fa-solid fa-xmark text-black hover:text-black/80"></i>
      </div>
      <img
        src={imageInfo.url}
        onError={(e) => e.currentTarget.setAttribute('src', defaultImage)}
        className="h-full w-full bg-default-image object-fill object-center"
      />
    </div>
  );
};

interface Props {
  images: IImageInfo[];
  onChange(images: IImageInfo[]): void;
  onBlur?(): void;
}

const InputImage = (props: Props) => {
  const { images, onChange, onBlur } = props;
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputRefCurrent = inputRef.current;
    const handleViewImages = () => {
      if (inputRefCurrent && inputRefCurrent.files) {
        const file = inputRefCurrent.files[0];
        const imageLocalLink = URL.createObjectURL(file);
        const name = file.name;
        onChange([...images, { id: 'new', file: name, url: imageLocalLink }]);
        inputRefCurrent.value = '';
      }
    };
    if (inputRefCurrent) {
      inputRefCurrent.addEventListener('change', handleViewImages);
    }
    return () => {
      if (inputRefCurrent) {
        inputRefCurrent?.removeEventListener('change', handleViewImages);
      }
    };
  }, [images, onChange]);

  const handleAddImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
      onBlur && onBlur();
    }
  };

  const handleRemoveImage = (imageInfo: IImageInfo) => {
    const newImageInfoArr = images.slice(0);
    const index = images.findIndex((image) => imageInfo.file == image.file);
    if (index > -1) {
      if (newImageInfoArr[index].id == 'new' && !!newImageInfoArr[index].url) {
        URL.revokeObjectURL(newImageInfoArr[index].url!);
      }
      newImageInfoArr.splice(index, 1);
    }
    onChange(newImageInfoArr);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      const imageLocalLink = URL.createObjectURL(file);
      const name = file.name;
      onChange([...images, { id: 'new', file: name, url: imageLocalLink }]);
      setDragging(false);
    },
    [images, onChange],
  );

  const handleDragEnter = useCallback(() => {
    setDragging(true);
  }, []);
  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <div className="flex flex-wrap gap-3">
      {images.map((imageInfo) => (
        <ImageView key={imageInfo.url} imageInfo={imageInfo} onRemove={handleRemoveImage} />
      ))}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={handleAddImage}
        className={`relative grid h-[120px] w-[120px] shrink-0 cursor-pointer place-content-center border border-white ${
          dragging ? 'border-solid border-[#A16EFF]' : 'border-dashed'
        }`}
      >
        <i
          className={`fa-solid fa-camera-retro border-b-4 border-purple-400 text-7xl ${
            dragging && 'pointer-events-none'
          }`}
        ></i>
      </div>
      <input type="file" hidden ref={inputRef} accept="image/*" />
    </div>
  );
};

export default InputImage;
