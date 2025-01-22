"use client";

import Link from "@node_modules/next/link";
import Image from "@node_modules/next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    setUpProviders();
  }, []);

  return (
    <nav className="w-full flex-between mb-16 pt-3">
      <Link href={"/"} className="flex space-x-5 flex-center">
        <Image
          src={"/assets/icons/logo2.png"}
          alt="Prompt Island Logo"
          width={60}
          height={60}
          className="object-contain rounded-full"
        ></Image>
        <h2 className="text-2xl orange_gradient font-semibold ">
          Prompt Island
        </h2>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Prompt
            </Link>
            <button onClick={signOut} type="button" className="outline_btn">
              Sign Out
            </button>

            <Link href={"/profile"}>
              <Image
                src={"/assets/icons/profile_placeholder.jpg"}
                alt="Profile"
                width={39}
                height={39}
                className="rounded-full"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name} // Use provider.name for the key
                  onClick={() => signIn(provider.id)} // Use provider.id for signIn
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile Navigation */}
      <div className="block sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image
              src={"/assets/icons/profile_placeholder.jpg"}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => {
                setToggleMenu((prev) => !prev);
              }}
            />

            {toggleMenu && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleMenu(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleMenu(false)}
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setToggleMenu(false);
                    signOut();
                  }}
                  className="mt-4 black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
