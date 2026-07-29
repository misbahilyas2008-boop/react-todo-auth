import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "../Components/Button/Button";
import heroImage from "../assets/header_img.png";
import handImage from "../assets/hand_wave.png";

export default function Home() {
  const { user: authUser, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Developer");

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && authUser?.name) {
        setUserName(authUser.name);
      } else {
        setUserName("Developer");
      }
    }
  }, [loading, isAuthenticated, authUser]);

  const greeting = `Hey ${userName}`;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 py-12">
      <div className="flex flex-col items-center text-center space-y-4 max-w-xl">
        {/* Hero Image */}
        <img
          src={heroImage}
          alt="Hero"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg border-2 border-gray-700 object-cover"
        />

        {/* Greeting */}
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
          {greeting}
          <img
            src={handImage}
            alt="Hand Wave"
            className="w-8 h-8 animate-wave"
          />
        </h1>

        {/* Merged Subtitle + Description */}
        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
          {isAuthenticated
            ? `Welcome back to Taskify! We’re glad to have you here, ${userName}. Track your tasks, stay organized, and achieve more with your personalized dashboard.`
            : "Welcome to Taskify! Join today to manage your daily tasks efficiently, stay organized, and focus on what truly matters."}
          <span className="text-blue-400 font-semibold"> Taskify</span>
        </p>

        {/* Button */}
        {!isAuthenticated ? (
          <Button
            onClick={() => navigate("/signup")}
            variant="outline"
            className="px-6 py-2 text-base rounded-full border-2 border-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Get Started
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/todos")}
            variant="primary"
            className="px-6 py-2 text-base rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          >
            Go to Todos
          </Button>
        )}
      </div>

      {/* Footer */}
      {/* <footer className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} Misbah. All rights reserved.
      </footer> */}
    </section>
  );
}
