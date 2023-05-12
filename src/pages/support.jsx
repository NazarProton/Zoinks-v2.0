import React, { useState } from 'react';

import letter from '/public/letter.svg';
import discordSupport from '/public/discordSupport.svg';
import telegramSupport from '/public/telegramSupport.svg';
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';
import NavBarMain from '../copmonents/contextComponents/navBar/NavBarMain';
import CustomToast from '../copmonents/contextComponents/universalComponents/CustomToast';
import Head from 'next/head';

function Support() {
  const [userData, setUserData] = useState({
    email: '',
    fullName: '',
    message: '',
    phone: '',
  });
  const handleChange = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    await axios
      .post(
        'https://zoinks.fi/api/support/ticket',
        {
          email: userData.email,
          fullName: userData.fullName,
          message: userData.message,
          phone: userData.phone || '+380000000000',
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
          },
        }
      )
      .then(function (response) {
        if (response.status === 200)
          toast.success(
            CustomToast('Your message has been sent successfully'),
            { icon: <BsCheckCircle color="green" /> }
          );
      })
      .catch(function () {
        toast.error(CustomToast('Something went wrong. Try again later'), {
          icon: <BsXCircle color="red" />,
        });
      });
    setUserData({
      email: '',
      fullName: '',
      message: '',
      phone: '',
    });
  }
  return (
    <>
      <Head>
        <title>Zoinks Hedge</title>
        <meta name="description" content="Zoinks Hedge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBarMain keywords={'Contacts zoinks page'}>
        <div className="flex flex-col pc500:flex-row mt-20 py-12 px-6 bg-whiteInherit">
          <div className="px-5 pt-16 pb-32 basis-1/2 flex flex-col ">
            <p className="font-play font-bold text-xl pc:text-2xl text-zoinksTextViolet">
              Get in touch
            </p>
            <p className="mt-5 font-play text-sm pc:text-lg text-violetLight">
              You&apos;re welcome to share your suggestions and proposals with
              us. Please fill free to join our social resources to be in touch
              with our team and follow the latest project updates. If you need
              any assistance don&apos;t hesitate to use the support contact.
            </p>{' '}
            <div className="flex items-center mt-5">
              <div className="flex items-center font-play text-sm pc:text-lg text-violetLight">
                <Image className="h-4 w-4 mr-2 " src={letter} alt="letterPic" />
                <p>support@zoinks.fi</p>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="flex items-center font-play text-sm pc:text-lg text-violetLight">
                <Image
                  className="h-4 w-4 mr-2 "
                  src={telegramSupport}
                  alt="telegramSupportPic"
                />
                <a href="http://bit.ly/3uvWthN" className="mt-1">
                  Telegram
                </a>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="flex items-center font-play text-sm pc:text-lg text-violetLight">
                <Image
                  className="h-4 w-4 mr-2 "
                  src={discordSupport}
                  alt="discordSupportPic"
                />
                <a href="http://bit.ly/3UGpOAo" className="mt-1">
                  Discord
                </a>
              </div>
            </div>
          </div>
          <div className="basis-1/2 flex justify-center items-center">
            <form className="w-11/12" onSubmit={handleSubmit}>
              <input
                required
                onChange={handleChange}
                name="fullName"
                type="text"
                value={userData.fullName || ''}
                className="my-3 w-full text-left bg-whiteInherit p-2  shadow  font-play"
                placeholder="Full name"
              ></input>
              <input
                required
                onChange={handleChange}
                name="email"
                type="text"
                value={userData.email || ''}
                className=" my-3 w-full text-left bg-whiteInherit p-2  shadow  font-play"
                placeholder="Email"
              ></input>
              <input
                onChange={handleChange}
                name="phone"
                type="number"
                value={userData.phone || ''}
                className=" my-3 w-full text-left bg-whiteInherit p-2  shadow  font-play"
                placeholder="Phone"
              ></input>
              <textarea
                required
                onChange={handleChange}
                name="message"
                type="text"
                value={userData.message || ''}
                className="min-h-min my-3 w-full bg-whiteInherit text-left p-2 shadow  font-play"
                placeholder="Message"
                rows="4"
                cols="20"
              ></textarea>
              <button
                disabled={
                  !userData.email.length &&
                  !userData.fullName.length &&
                  !userData.message.length
                }
                type="submit"
                className="bg-whiteInherit hover:bg-cyan disabled:bg-whiteInherit w-full text-white p-4 font-play focus:outline-none focus:ring-2 focus:ring-zoinks focus:ring-offset-2 focus:ring-offset-zoinks"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </NavBarMain>
    </>
  );
}

export default Support;
