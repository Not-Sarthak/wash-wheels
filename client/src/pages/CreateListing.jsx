import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    // bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className='p-4 max-w-3xl w-full mx-auto rounded-lg shadow-md hover:shadow-xl md:p-10'>
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-yellow-500 mb-2">
        Convenient Car <span className="underline underline-offset-3 decoration-8 decoration-yellow-400 dark:decoration-yellow-600"> Washing at</span> Your <span className="underline underline-offset-3 decoration-8 decoration-yellow-400 dark:decoration-yellow-600">Doorstep!</span>
        </h2>
        <p className="text-lg text-gray-700">
          Sit back and relax while we make your car shine. Schedule your service today!
        </p>
      </div>
  <form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
    <div className='flex flex-col'>
      <label htmlFor='name' className='text-gray-600 font-medium'>
        Name
      </label>
      <input
        type='text'
        id='name'
        placeholder='Enter your name'
        className='border p-3 rounded-lg'
        maxLength='62'
        minLength='10'
        required
        onChange={handleChange}
        value={formData.name}
      />

      <label htmlFor='description' className='mt-4 text-gray-600 font-medium'>
        Description
      </label>
      <textarea
        id='description'
        placeholder='Enter a Brief Description'
        className='border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-400'
        required
        onChange={handleChange}
        value={formData.description}
      />

      <label htmlFor='address' className='mt-4 text-gray-600 font-medium'>
        Address
      </label>
      <input
        type='text'
        placeholder='Address'
        className='border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-400'
        id='address'
        required
        onChange={handleChange}
        value={formData.address}
      />

      <div className='flex items-center gap-2 mt-4'>
        <input
          type='checkbox'
          id='sale'
          className='w-5 h-4 text-yellow-600 bg-yellow-100 border-yellow-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-yellow-800 focus:ring-2 dark:bg-yellow-700 dark:border-yellow-600 transition-transform transform-gpu hover:scale-110'
          onChange={handleChange}
          checked={formData.type === 'sale'}
        />
        <span>Convenient <span className='text-yellow-600'>In-Home</span> Car Wash</span>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <input
          type='checkbox'
          id='rent'
          className='w-5 h-4 text-yellow-600 bg-yellow-100 border-yellow-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-yellow-800 focus:ring-2 dark:bg-yellow-700 dark:border-yellow-600 transition-transform transform-gpu hover:scale-110'
          onChange={handleChange}
          checked={formData.type === 'rent'}
        />
        <span><span className='text-yellow-600'>Pick-Up</span> and <span className='text-yellow-600'>Return</span> Car Wash Service</span>
      </div>
    </div>

    <div className='flex flex-col gap-6'>
      <label htmlFor='description' className='text-gray-600 font-medium'>
        Type of Service
      </label>

      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='parking'
            className='w-4 h-4 text-blue-600'
            onChange={handleChange}
            checked={formData.parking}
          />
          <label htmlFor='parking'>Interior Cleaning</label>
        </div>

        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='furnished'
            className='w-4 h-4 text-blue-600'
            onChange={handleChange}
            checked={formData.furnished}
          />
          <label htmlFor='furnished'>Exterior Cleaning</label>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='description' className='text-gray-600 font-medium'>
          Add Tip?
        </label>
        <input
          type='checkbox'
          id='offer'
          className='w-4 h-4 text-blue-600'
          onChange={handleChange}
          checked={formData.offer}
        />
      </div>

      <div className='flex flex-col gap-4'>
        <label htmlFor='description' className='text-gray-600 font-medium'>
          Car Details
        </label>

        <div className='flex items-center gap-2'>
          <input
            type='number'
            id='bedrooms'
            min='1'
            max='10'
            required
            className='p-2 border border-gray-300 rounded-lg'
            onChange={handleChange}
            value={formData.bedrooms}
          />
          <label htmlFor='bedrooms'>Wheeler</label>
        </div>

        <div className='flex gap-2 flex-col'>
          <label htmlFor='serviceTime' className='text-gray-600 font-medium'>Time</label>
          <input
            type="text"
            id="serviceTime"
            required
            className="p-2 border border-gray-300"
            onChange={handleChange}
            value={formData.bathrooms}
            onFocus={(e) => e.target.type = "time"}
            onBlur={(e) => e.target.type = "text"}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='regularPrice' className='text-gray-600 font-medium'>
            Regular price
            {formData.type === 'rent' && (
              <span className='text-xs'>( ₹ )</span>
            )}
          </label>
          <input
            type='number'
            id='regularPrice'
            min='50'
            max='10000000'
            required
            className='p-2 border border-gray-300 rounded-lg'
            onChange={handleChange}
            value={formData.regularPrice}
          />
        </div>

        {formData.offer && (
          <div className='flex flex-col gap-2'>
            <label htmlFor='discountPrice' className='text-gray-600 font-medium'>
              Tip Amount
              {formData.type === 'rent' && (
                <span className='text-xs'>( ₹ )</span>
              )}
            </label>
            <input
              type='number'
              id='discountPrice'
              min='0'
              max='10000000'
              required
              className='p-2 border border-gray-300 rounded-lg'
              onChange={handleChange}
              value={formData.discountPrice}
            />
          </div>
        )}
      </div>
    </div>

    <div className='flex flex-col flex-1 gap-4'>
      <label htmlFor='images' className='text-gray-600 font-medium'>
        Images:
        <span className='text-xs text-gray-600'>
          [The first image will be the cover (Max 6)]
        </span>
      </label>
      <label htmlFor='images' className='text-gray-600 font-medium'>
        Upload Images
      </label>
      <div className='relative border border-gray-300 rounded-lg bg-gray-50 dark:bg-white p-4 cursor-pointer hover:bg-gray-100 hover:border-yellow-500'>
        <input
          onChange={(e) => setFiles(e.target.files)}
          className='hidden'
          type='file'
          id='images'
          accept='image/*'
          multiple
        />
        <div className='flex items-center justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='w-8 h-8 text-gray-500 dark:text-gray-400'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
          <span className='ml-2 text-sm text-gray-900 dark:text-gray-400'>
            Choose a File
          </span>
        </div>
      </div>
      <button
        type='button'
        disabled={uploading}
        onClick={handleImageSubmit}
        className='w-full h-12 px-4 py-2 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-white border-2 border-yellow-400 transition-all duration-300 ease-in-out'
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      <p className='text-red-700 text-sm'>
        {imageUploadError && imageUploadError}
      </p>
      {formData.imageUrls.length > 0 &&
        formData.imageUrls.map((url, index) => (
          <div key={url} className='flex justify-between p-2 border items-center'>
            <img
              src={url}
              alt='listing image'
              className='w-20 h-20 object-contain rounded-lg'
            />
            <button
              type='button'
              onClick={() => handleRemoveImage(index)}
              className='p-2 text-red-700 border border-red-700 rounded-full uppercase hover:bg-red-700 hover:text-white transition duration-300'
            >
              Delete
            </button>
          </div>
        ))}
      <button
        disabled={loading || uploading}
        className='w-full h-12 px-4 py-2 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-white border-2 border-yellow-400 transition-all duration-300 ease-in-out'
      >
        {loading ? 'Creating...' : 'Create listing'}
      </button>
      {error && <p className='text-red-700 text-sm'>{error}</p>}
    </div>
  </form>
</main>

  );
}


// <div className='flex flex-col'>
   

          
//    <div className='flex gap-6 flex-wrap'>
   

//      <div className='flex gap-2'>
//        <input
//          type='checkbox'
//          id='parking'
//          className='w-5'
//          onChange={handleChange}
//          checked={formData.parking}
//        />
//        <span>Parking spot</span>
//      </div>
//      <div className='flex gap-2'>
//        <input
//          type='checkbox'
//          id='furnished'
//          className='w-5'
//          onChange={handleChange}
//          checked={formData.furnished}
//        />
//        <span>Furnished</span>
//      </div>
//      <div className='flex gap-2'>
//        <input
//          type='checkbox'
//          id='offer'
//          className='w-5'
//          onChange={handleChange}
//          checked={formData.offer}
//        />
//        <span>Offer</span>
//      </div>
//    </div>
//    <div className='flex flex-wrap gap-6'>
//      <div className='flex items-center gap-2'>
//        <input
//          type='number'
//          id='bedrooms'
//          min='1'
//          max='10'
//          required
//          className='p-3 border border-gray-300 rounded-lg'
//          onChange={handleChange}
//          value={formData.bedrooms}
//        />
//        <p>Beds</p>
//      </div>
//      <div className='flex items-center gap-2'>
//        <input
//          type='number'
//          id='bathrooms'
//          min='1'
//          max='10'
//          required
//          className='p-3 border border-gray-300 rounded-lg'
//          onChange={handleChange}
//          value={formData.bathrooms}
//        />
//        <p>Baths</p>
//      </div>
//      <div className='flex items-center gap-2'>
//        <input
//          type='number'
//          id='regularPrice'
//          min='50'
//          max='10000000'
//          required
//          className='p-3 border border-gray-300 rounded-lg'
//          onChange={handleChange}
//          value={formData.regularPrice}
//        />
//        <div className='flex flex-col items-center'>
//          <p>Regular price</p>
//          {formData.type === 'rent' && (
//            <span className='text-xs'>($ / month)</span>
//          )}
//        </div>
//      </div>
//      {formData.offer && (
//        <div className='flex items-center gap-2'>
//          <input
//            type='number'
//            id='discountPrice'
//            min='0'
//            max='10000000'
//            required
//            className='p-3 border border-gray-300 rounded-lg'
//            onChange={handleChange}
//            value={formData.discountPrice}
//          />
//          <div className='flex flex-col items-center'>
//            <p>Discounted price</p>

//            {formData.type === 'rent' && (
//              <span className='text-xs'>($ / month)</span>
//            )}
//          </div>
//        </div>
//      )}
//    </div>
//  </div>
//  <div className='flex flex-col flex-1 gap-4'>
//    <p className='font-semibold'>
//      Images:
//      <span className='font-normal text-gray-600 ml-2'>
//        The first image will be the cover (max 6)
//      </span>
//    </p>
//    <div className='flex gap-4'>
//      <input
//        onChange={(e) => setFiles(e.target.files)}
//        className='p-3 border border-gray-300 rounded w-full'
//        type='file'
//        id='images'
//        accept='image/*'
//        multiple
//      />
//      <button
//        type='button'
//        disabled={uploading}
//        onClick={handleImageSubmit}
//        className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
//      >
//        {uploading ? 'Uploading...' : 'Upload'}
//      </button>
//    </div>
//    <p className='text-red-700 text-sm'>
//      {imageUploadError && imageUploadError}
//    </p>
//    {formData.imageUrls.length > 0 &&
//      formData.imageUrls.map((url, index) => (
//        <div
//          key={url}
//          className='flex justify-between p-3 border items-center'
//        >
//          <img
//            src={url}
//            alt='listing image'
//            className='w-20 h-20 object-contain rounded-lg'
//          />
//          <button
//            type='button'
//            onClick={() => handleRemoveImage(index)}
//            className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
//          >
//            Delete
//          </button>
//        </div>
//      ))}
//    <button
//      disabled={loading || uploading}
//      className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//    >
//      {loading ? 'Creating...' : 'Create listing'}
//    </button>
//    {error && <p className='text-red-700 text-sm'>{error}</p>}
//  </div>