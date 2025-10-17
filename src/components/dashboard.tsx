import React from "react";
import { Button } from "../ui/button";
import { RxQuestionMarkCircled } from "react-icons/rx";
import abstractLogo from "../assets/wellcome.svg";
import { GrCircleAlert } from "react-icons/gr";
import { MdSavedSearch } from "react-icons/md";
import { TfiLink } from "react-icons/tfi";
import { RiGalleryLine } from "react-icons/ri";
import { MdVoiceChat } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

type DashboardProps = {
  to?: string;
  label?: string;
  className?: string;
  newTab?: boolean;
};

const Dashboard: React.FC<DashboardProps> = ({
  to = "/ChatWindow",
  //   label = "Open Chat",
  className = "",
  newTab = false,
}) => {
  const handleClick = () => {
    if (newTab) {
      window.open(to, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = to;
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col gap-6">
      {/* First Div */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-black text-2xl font-bold">
            Chat With GMS Assistant
          </h1>
          <p className="text-gray-700 text-sm mt-2">
            Get smart recommendations, verify eligibility, and finish your grant
            application end-to-end.
          </p>
        </div>

        <RxQuestionMarkCircled className="text-gray-700 text-4xl bg-white rounded-full p-2 shadow" />

        <Button
          variant="outline"
          className="text-sm bg-black text-white rounded-full hover:bg-gray-900 border-0 px-12 py-5"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.35464 9.44125L10.1865 1.95551C10.6426 1.37006 11.4975 1.73445 11.4975 2.51431V8.30837C11.4975 8.7755 11.8328 9.15425 12.2463 9.15425H15.0828C15.7273 9.15425 16.0708 10.0125 15.645 10.5589L9.81317 18.0447C9.35709 18.6301 8.50217 18.2657 8.50217 17.4858V11.6918C8.50217 11.2247 8.1669 10.8459 7.75334 10.8459H4.9168C4.27243 10.8459 3.92895 9.98767 4.35464 9.44125Z"
              stroke="white"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Switch To Form
        </Button>
      </div>

      {/* Container Below */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto min-h-[578px]">
        <div className="flex flex-col justify-center items-center p-4">
          <img
            src={abstractLogo}
            alt="Abstract Logo"
            className="w-22 h-22 object-contain"
          />
          <h1 className="text-black text-2xl font-bold">
            Welcome To The GMS InTake Assistant
          </h1>
          <p className="text-gray-700 text-sm mt-2">
            Choose A Task To Begin, You Can Switch Between Chat And Forms
            AnyTime.
          </p>
        </div>
        <div className="w-[750px] h-[290px] bg-white p-3 rounded-lg flex flex-col gap-3 shadow -ml-4">
          {/* First Row */}
          <div className="flex gap-2">
            <div className="w-[252px] h-[128px] rounded-lg border border-gray-300 p-3 flex flex-col items-start justify-center gap-2"
            onClick={() => navigate("/chat")}
            >
              {/* First row: SVG + text */}
              <div
                className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.25 11.5278C3.25 7.23224 6.73223 3.75 11.0278 3.75C11.5647 3.75 12 4.18528 12 4.72223C12 5.25917 11.5647 5.69445 11.0278 5.69445C7.80611 5.69445 5.19444 8.30613 5.19444 11.5278C5.19444 14.7495 7.80611 17.3612 11.0278 17.3612C14.2495 17.3612 16.8611 14.7495 16.8611 11.5278C16.8611 10.9909 17.2964 10.5556 17.8333 10.5556C18.3703 10.5556 18.8056 10.9909 18.8056 11.5278C18.8056 13.3252 18.1959 14.9801 17.1721 16.2972L20.4653 19.5903C20.8449 19.97 20.8449 20.5856 20.4653 20.9653C20.0856 21.345 19.47 21.345 19.0903 20.9653L15.7972 17.6721C14.4801 18.696 12.8252 19.3056 11.0278 19.3056C6.73223 19.3056 3.25 15.8234 3.25 11.5278Z"
                    fill="#7D52F4"
                  />
                  <path
                    d="M15.5 2.75C15.8138 2.75 16.0945 2.9454 16.2034 3.23972L16.4613 3.93675C16.8233 4.9151 16.9388 5.18091 17.1289 5.37106C17.3191 5.56121 17.5849 5.67667 18.5633 6.03869L19.2603 6.29661C19.5546 6.40552 19.75 6.68617 19.75 7C19.75 7.31383 19.5546 7.59448 19.2603 7.70339L18.5633 7.96131C17.5849 8.32333 17.3191 8.43879 17.1289 8.62894C16.9388 8.81909 16.8233 9.0849 16.4613 10.0633L16.2034 10.7603C16.0945 11.0546 15.8138 11.25 15.5 11.25C15.1862 11.25 14.9055 11.0546 14.7966 10.7603L14.5387 10.0633C14.1767 9.0849 14.0612 8.81909 13.8711 8.62894C13.6809 8.43879 13.4151 8.32333 12.4367 7.96131L11.7397 7.70339C11.4454 7.59448 11.25 7.31383 11.25 7C11.25 6.68617 11.4454 6.40552 11.7397 6.29661L12.4367 6.03869C13.4151 5.67667 13.6809 5.56121 13.8711 5.37106C14.0612 5.18091 14.1767 4.9151 14.5387 3.93675L14.7966 3.23972C14.9055 2.9454 15.1862 2.75 15.5 2.75Z"
                    fill="#7D52F4"
                  />
                </svg>

                <h4 className="text-black text-base font-semibold">
                  Discover Grants
                </h4>
              </div>

              {/* Second row: sentence below */}
              <p className="text-gray-500 text-sm mt-2">
                Find and explore grants suitable for your projects and needs.
              </p>
            </div>

            <div className="w-[252px] h-[128px] rounded-lg border border-gray-300 p-3 flex flex-col items-start justify-center gap-2">
              {/* First row: SVG + text */}
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17 1.25C13.8244 1.25 11.25 3.82436 11.25 7C11.25 10.1756 13.8244 12.75 17 12.75C20.1756 12.75 22.75 10.1756 22.75 7C22.75 3.82436 20.1756 1.25 17 1.25ZM19.2504 6.20717C19.6408 6.06889 19.8453 5.64027 19.707 5.24982C19.5687 4.85937 19.1401 4.65495 18.7496 4.79323C18.2675 4.96399 17.8199 5.28384 17.4411 5.61601C17.0546 5.955 16.6963 6.34574 16.3947 6.70726C16.2485 6.88246 16.1135 7.05341 15.9928 7.21192C15.9046 7.12935 15.8162 7.05964 15.7285 7.00117L15.7233 6.99771C15.565 6.89209 15.3522 6.7502 15 6.7502C14.5858 6.7502 14.25 7.08599 14.25 7.5002C14.25 7.87492 14.5248 8.18546 14.8839 8.24127C14.9396 8.2784 15.1237 8.42459 15.3292 8.83561C15.4501 9.07738 15.6917 9.2354 15.9616 9.24922C16.2315 9.26304 16.4882 9.13018 16.6332 8.90213C16.796 8.67148 17.276 7.9924 17.5465 7.66815C17.8184 7.34217 18.1219 7.01416 18.4302 6.74377C18.7463 6.46657 19.0266 6.28642 19.2504 6.20717Z"
                    fill="#68CDFF"
                  />
                  <path
                    opacity="0.4"
                    d="M12.5824 1.25084C10.86 2.57633 9.75 4.65854 9.75 7C9.75 11.0041 12.9959 14.25 17 14.25C18.3725 14.25 19.6559 13.8686 20.75 13.2061V14.0593C20.75 15.8946 20.75 17.3527 20.5875 18.4948C20.4194 19.6753 20.0647 20.6274 19.2745 21.3737C18.4904 22.1142 17.5001 22.4415 16.2712 22.5976C15.0706 22.75 13.5341 22.75 11.5833 22.75H10.4167C8.46586 22.75 6.92941 22.75 5.72885 22.5976C4.49987 22.4415 3.50965 22.1142 2.72552 21.3737C1.93534 20.6274 1.5806 19.6753 1.41255 18.4948C1.24997 17.3527 1.24998 15.8946 1.25 14.0593V9.94068C1.24998 8.10542 1.24997 6.64729 1.41255 5.50521C1.5806 4.32468 1.93534 3.37259 2.72552 2.62631C3.50965 1.88575 4.49987 1.55847 5.72885 1.40242C6.92941 1.24998 8.46584 1.24999 10.4167 1.25H11.5833C11.9292 1.25 12.2621 1.25 12.5824 1.25084Z"
                    fill="#68CDFF"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5 13C5 12.4477 5.44772 12 6 12H9.10825C9.66054 12 10.1083 12.4477 10.1083 13C10.1083 13.5523 9.66054 14 9.10825 14H6C5.44772 14 5 13.5523 5 13Z"
                    fill="#68CDFF"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5 17C5 16.4477 5.44772 16 6 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H6C5.44772 18 5 17.5523 5 17Z"
                    fill="#68CDFF"
                  />
                </svg>

                <h4 className="text-black text-base font-semibold">
                  Start Application
                </h4>
              </div>

              {/* Second row: sentence below */}
              <p className="text-gray-500 text-sm mt-2">
                Create a project and pre-fill Company details from
                documents/MyInfo.
              </p>
            </div>

            <div className="w-[252px] h-[128px] rounded-lg border border-gray-300 p-3 flex flex-col items-start justify-center gap-2">
              {/* First row: SVG + text */}
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M12.5564 1.25C14.3941 1.24998 15.8497 1.24997 16.989 1.40314C18.1614 1.56076 19.1103 1.89288 19.8587 2.64124C20.6071 3.38961 20.9392 4.33856 21.0968 5.51098C21.25 6.65018 21.2499 8.1058 21.2499 9.94354V14.0564C21.2499 15.8941 21.25 17.3498 21.0968 18.489C20.9392 19.6614 20.6071 20.6104 19.8587 21.3588C19.1103 22.1071 18.1614 22.4392 16.989 22.5969C15.8497 22.75 14.3941 22.75 12.5564 22.75H11.4436C9.60589 22.75 8.15016 22.75 7.01094 22.5969C5.83851 22.4392 4.88956 22.1071 4.14119 21.3587C3.39283 20.6104 3.06072 19.6614 2.9031 18.489C2.74994 17.3498 2.74997 15.8941 2.75 14.0564L2.75004 9.94351C2.75004 8.10576 2.75004 6.65014 2.90321 5.51094C3.06085 4.33852 3.39297 3.38958 4.14133 2.64123C4.88969 1.89287 5.83863 1.56076 7.01105 1.40313C8.15025 1.24997 9.60587 1.24998 11.4436 1.25H12.5564Z"
                    fill="#FF8447"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 7C7 6.44772 7.44772 6 8 6H16C16.5523 6 17 6.44772 17 7C17 7.55228 16.5523 8 16 8H8C7.44772 8 7 7.55228 7 7ZM7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12ZM7 17C7 16.4477 7.44772 16 8 16H12C12.5523 16 13 16.4477 13 17C13 17.5523 12.5523 18 12 18H8C7.44771 18 7 17.5523 7 17Z"
                    fill="#FF8447"
                  />
                </svg>

                <h4 className="text-black text-base font-semibold">
                  Project & Outcomes
                </h4>
              </div>

              {/* Second row: sentence below */}
              <p className="text-gray-500 text-sm mt-2">
                Plan Milestones with Business + Worker KPIs (CTC standard)
              </p>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex gap-2">
            <div className="w-[252px] h-[128px] rounded-lg border border-gray-300 p-3 flex flex-col items-start justify-center gap-2">
              {/* First row: SVG + text */}
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M20.2033 14.647C21.0752 14.479 21.5111 14.395 21.6606 14.5463C21.6782 14.5641 21.6891 14.5772 21.7034 14.5977C21.8254 14.772 21.6974 15.1004 21.4414 15.7573C19.9607 19.5573 16.2657 22.25 11.9417 22.25C6.313 22.25 1.75 17.687 1.75 12.0582C1.75 7.73431 4.44269 4.03928 8.24269 2.55853C8.89947 2.30261 9.22786 2.17465 9.40211 2.29656C9.42264 2.31092 9.43574 2.32185 9.45357 2.33945C9.60489 2.48888 9.52088 2.9248 9.35287 3.79663C9.20681 4.55454 9.20711 5.44239 9.20739 6.24922C9.20757 6.77036 9.20752 7.2915 9.20747 7.81264C9.20744 8.06101 9.20742 8.30938 9.20742 8.55775L9.20741 8.63425C9.2073 9.48139 9.20719 10.3242 9.3015 11.0256C9.40887 11.8243 9.67386 12.7624 10.4557 13.5442C11.2375 14.326 12.1756 14.591 12.9743 14.6984C13.6754 14.7927 14.5177 14.7926 15.3643 14.7925C15.3903 14.7925 15.4162 14.7925 15.4421 14.7925H17.6603C17.6903 14.7925 17.7203 14.7925 17.7505 14.7925C18.5574 14.7928 19.4453 14.7931 20.2033 14.647Z"
                    fill="#FFB800"
                  />
                  <path
                    d="M15.6832 2.40072L15.6186 2.37394C14.9933 2.11478 14.4114 1.8736 13.872 1.78681C13.2434 1.68566 12.6693 1.78791 12.0723 2.15656C12.0239 2.18644 11.9523 2.23426 11.9062 2.26753C11.2955 2.70804 11.0024 3.28368 10.8691 3.97508C10.7498 4.59427 10.7499 5.36328 10.75 6.24867V8.47956C10.7499 9.39501 10.7499 10.157 10.8312 10.7617C10.9169 11.3993 11.1053 11.9731 11.566 12.4339C12.0268 12.8946 12.6005 13.083 13.2382 13.1687C13.8428 13.25 14.6048 13.25 15.5203 13.2499H17.7512C18.6366 13.25 19.4056 13.2501 20.0248 13.1308C20.7162 12.9975 21.2918 12.7044 21.7324 12.0937C21.7656 12.0476 21.8135 11.976 21.8433 11.9276C22.212 11.3306 22.3142 10.7565 22.2131 10.1279C22.1263 9.58851 21.8851 9.0066 21.626 8.38133L21.5992 8.3167C21.0498 6.99045 20.2446 5.7854 19.2296 4.77033C18.2145 3.75527 17.0094 2.95007 15.6832 2.40072Z"
                    fill="#FFB800"
                  />
                </svg>

                <h4 className="text-black text-base font-semibold">
                  Budgest & Co-funding
                </h4>
              </div>

              {/* Second row: sentence below */}
              <p className="text-gray-500 text-sm mt-2">
                Build a Compliant budgest with caps, quotes, and guardrails.
              </p>
            </div>
            <div className="w-[252px] h-[128px] rounded-lg border border-gray-300 p-3 flex flex-col items-start justify-center gap-2">
              {/* First row: SVG + text */}
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 8.5C9.5 9.60457 8.60457 10.5 7.5 10.5C6.39543 10.5 5.5 9.60457 5.5 8.5C5.5 7.39543 6.39543 6.5 7.5 6.5C8.60457 6.5 9.5 7.39543 9.5 8.5Z"
                    fill="#6895FF"
                  />
                  <path
                    d="M18.5 1.25C18.8138 1.25 19.0945 1.4454 19.2034 1.73972L19.4613 2.43675C19.8233 3.4151 19.9388 3.68091 20.1289 3.87106C20.3191 4.06121 20.5849 4.17667 21.5633 4.53869L22.2603 4.79661C22.5546 4.90552 22.75 5.18617 22.75 5.5C22.75 5.81383 22.5546 6.09448 22.2603 6.20339L21.5633 6.46131C20.5849 6.82333 20.3191 6.93879 20.1289 7.12894C19.9388 7.31909 19.8233 7.5849 19.4613 8.56325L19.2034 9.26028C19.0945 9.5546 18.8138 9.75 18.5 9.75C18.1862 9.75 17.9055 9.5546 17.7966 9.26028L17.5387 8.56325C17.1767 7.5849 17.0612 7.31909 16.8711 7.12894C16.6809 6.93879 16.4151 6.82333 15.4367 6.46131L14.7397 6.20339C14.4454 6.09448 14.25 5.81383 14.25 5.5C14.25 5.18617 14.4454 4.90552 14.7397 4.79661L15.4367 4.53869C16.4151 4.17667 16.6809 4.06121 16.8711 3.87106C17.0612 3.68091 17.1767 3.4151 17.5387 2.43675L17.7966 1.73972C17.9055 1.4454 18.1862 1.25 18.5 1.25Z"
                    fill="#6895FF"
                  />
                  <path
                    opacity="0.4"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.5015 2.25H11.4273C9.30315 2.24998 7.60973 2.24996 6.28198 2.42847C4.91104 2.61279 3.78471 3.00337 2.89404 3.89404C2.00337 4.78471 1.61279 5.91104 1.42847 7.28198C1.24996 8.60973 1.24998 10.3031 1.25 12.4273V12.5727C1.24998 14.6969 1.24996 16.3903 1.42847 17.718C1.61279 19.089 2.00337 20.2153 2.89404 21.106C3.78471 21.9966 4.91104 22.3872 6.28198 22.5715C7.60974 22.75 9.30317 22.75 11.4274 22.75H11.5727C13.6968 22.75 15.3903 22.75 16.718 22.5715C18.089 22.3872 19.2153 21.9966 20.106 21.106C20.9966 20.2153 21.3872 19.089 21.5715 17.718C21.75 16.3903 21.75 14.6968 21.75 12.5727V12.4987C21.75 11.9817 21.75 11.4923 21.7477 11.0309C21.7451 10.4918 21.3059 10.0569 20.7667 10.0595C20.2276 10.0622 19.7927 10.5014 19.7954 11.0405C19.7976 11.4966 19.7976 11.9814 19.7976 12.5C19.7976 12.799 19.7976 13.0861 19.7971 13.362C13.7051 10.3912 9.3109 15.6805 5.41613 20.3954C4.91695 20.2327 4.56206 20.0129 4.27458 19.7254C3.80713 19.258 3.51865 18.6123 3.36344 17.4579C3.20446 16.2753 3.20238 14.7135 3.20238 12.5C3.20238 10.2865 3.20446 8.72466 3.36344 7.54213C3.51865 6.38769 3.80713 5.74203 4.27458 5.27458C4.74203 4.80713 5.38769 4.51865 6.54213 4.36344C7.72466 4.20446 9.28655 4.20238 11.5 4.20238C12.0186 4.20238 12.5034 4.20238 12.9595 4.20463C13.4986 4.20729 13.9378 3.77239 13.9405 3.23326C13.9431 2.69413 13.5082 2.25493 12.9691 2.25227C12.5078 2.25 12.0184 2.25 11.5015 2.25Z"
                    fill="#6895FF"
                  />
                </svg>

                <h4 className="text-black text-base font-semibold">
                  Document Coach
                </h4>
              </div>

              {/* Second row: sentence below */}
              <p className="text-gray-500 text-sm mt-2">
                Upload evidence: AI flags issues and suggests fixes.
              </p>
            </div>
            <div className="w-[252px] h-[128px] rounded-lg border border-gray-300 p-3 flex flex-col items-start justify-center gap-2">
              {/* First row: SVG + text */}
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 12C6 11.3096 6.55964 10.75 7.25 10.75H7.25897C7.94933 10.75 8.50897 11.3096 8.50897 12C8.50897 12.6904 7.94933 13.25 7.25897 13.25H7.25C6.55964 13.25 6 12.6904 6 12ZM10.7456 12C10.7456 11.3096 11.3052 10.75 11.9956 10.75H12.0045C12.6949 10.75 13.2545 11.3096 13.2545 12C13.2545 12.6904 12.6949 13.25 12.0045 13.25H11.9956C11.3052 13.25 10.7456 12.6904 10.7456 12ZM15.4911 12C15.4911 11.3096 16.0507 10.75 16.7411 10.75H16.75C17.4404 10.75 18 11.3096 18 12C18 12.6904 17.4404 13.25 16.75 13.25H16.7411C16.0507 13.25 15.4911 12.6904 15.4911 12Z"
                    fill="#FB3748"
                  />
                  <path
                    opacity="0.4"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17 3C17 2.44772 17.4477 2 18 2C19.913 2 21.231 3.73702 21.231 5.57143C21.231 5.7037 21.2308 5.83139 21.2305 5.95493C21.2286 6.92941 21.2271 7.64598 21.3561 8.31957C21.4902 9.02032 21.7711 9.67768 22.4286 10.4355C23.1905 11.3136 23.1905 12.6864 22.4286 13.5645C21.7711 14.3223 21.4902 14.9797 21.3561 15.6804C21.2271 16.354 21.2286 17.0706 21.2305 18.045C21.2308 18.1686 21.231 18.2963 21.231 18.4286C21.231 20.263 19.913 22 18 22C17.4477 22 17 21.5523 17 21C17 20.4477 17.4477 20 18 20C18.5513 20 19.231 19.4345 19.231 18.4286C19.231 18.3009 19.2306 18.1735 19.2302 18.0463C19.2271 17.1055 19.224 16.1805 19.3917 15.3044C19.5932 14.2517 20.0334 13.2733 20.9179 12.2538C21.0274 12.1277 21.0274 11.8723 20.9179 11.7462C20.0334 10.7267 19.5932 9.74823 19.3917 8.69554C19.224 7.81947 19.2271 6.89448 19.2302 5.95367C19.2306 5.82652 19.231 5.69908 19.231 5.57143C19.231 4.56552 18.5513 4 18 4C17.4477 4 17 3.55229 17 3Z"
                    fill="#FB3748"
                  />
                  <path
                    opacity="0.4"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 3C7 2.44772 6.55228 2 6 2C4.08695 2 2.76897 3.73702 2.76897 5.57143C2.76897 5.63284 2.76899 5.69342 2.76902 5.7532C2.76989 7.94318 2.77033 9.05366 1.57139 10.4355C0.809534 11.3136 0.809536 12.6864 1.5714 13.5645C2.22892 14.3223 2.50982 14.9797 2.64394 15.6804C2.77287 16.354 2.77143 17.0706 2.76947 18.045C2.76923 18.1686 2.76897 18.2963 2.76897 18.4286C2.76897 20.263 4.08695 22 6 22C6.55228 22 7 21.5523 7 21C7 20.4477 6.55228 20 6 20C5.44872 20 4.76897 19.4345 4.76897 18.4286C4.76897 18.3009 4.76939 18.1735 4.76981 18.0463C4.77291 17.1055 4.77596 16.1805 4.60829 15.3044C4.4068 14.2517 3.96658 13.2733 3.08206 12.2538C2.97265 12.1277 2.97265 11.8723 3.08206 11.7462C4.77803 9.79147 4.77405 7.98584 4.76945 5.90134C4.76921 5.79216 4.76897 5.68221 4.76897 5.57143C4.76897 4.56552 5.44872 4 6 4C6.55228 4 7 3.55229 7 3Z"
                    fill="#FB3748"
                  />
                </svg>

                <h4 className="text-black text-base font-semibold">
                  Trach & Claims
                </h4>
              </div>

              {/* Second row: sentence below */}
              <p className="text-gray-500 text-sm mt-2">
                See Status, respond to clarifications, and submit claims.
              </p>
            </div>
          </div>
        </div>
        {/* <div className="w-full h-full p-2">
    
<input
  type="text"
  placeholder="Enter text"
  className="w-full h-20 border border-gray-300 rounded-md p-2"
/>

</div>  */}

        <div className="w-[775px] h-[110px] p-2 -ml-7">
          <div className="shadow-sm relative">
            {/* Card Title / Message with X */}
            <div className="flex justify-between items-center bg-blue-50 px-3 py-2 rounded-t-md">
              <p className="text-blue-700 font-medium flex items-center gap-2">
                <GrCircleAlert />
                By selecting a feature, it will make your goal easier to achieve
              </p>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-700"
                onClick={() => console.log("Clear message")}
              >
                ✕
              </button>
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder='Type "start intake", paste a UEN, or drop a BizFile/ACRA PDF...'
              className="w-full h-20 border border-gray-300 border-t-0 rounded-b-md px-3 pb-10 pt-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Rounded Pill inside the input */}
            <div className="absolute bottom-2 left-3 flex gap-2">
              {/* Circle 1 */}
              <div
                className="h-6 w-[101px] rounded-full p-[1px] 
          bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center"
              >
                <div className="h-full w-full bg-white rounded-full flex items-center justify-center text-black text-xs font-medium px-2 whitespace-nowrap">
                  Check Eligibility
                </div>
              </div>

              {/* Circle 2 */}
              <div
                className="h-6 w-[101px] rounded-full p-[1px] 
          bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center"
              >
                <div className="h-full w-full bg-white rounded-full flex items-center justify-center text-black text-xs font-medium px-2">
                  Plan Project
                </div>
              </div>

              {/* Circle 3 */}
              <div
                className="h-6 w-[147px] rounded-full p-[1px] 
          bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center"
              >
                <div className="h-full w-full bg-white rounded-full flex items-center justify-center text-black text-xs font-medium px-2  whitespace-nowrap">
                  Run One-Tap Verification
                </div>
              </div>
              <TfiLink />
              <MdSavedSearch />
              <RiGalleryLine className="ml-55" />
              <MdVoiceChat className="ml-2" />
              <BsFillSendFill className="ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
