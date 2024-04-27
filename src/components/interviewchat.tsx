import React from "react";

function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

// Assuming these components are defined in your project
const Avatar = ({ children }) => <div>{children}</div>;
const AvatarImage = ({ alt, src }) => <img alt={alt} src={src} />;
const AvatarFallback = ({ children }) => <span>{children}</span>;
const Input = ({ className, placeholder }) => (
  <input className={className} placeholder={placeholder} type="text" />
);
const Button = ({ children }) => <button>{children}</button>;

export default function InterviewChat() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b bg-gray-100 px-6 dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <Package2Icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          <h1 className="text-lg font-medium text-gray-900 dark:text-gray-50">
            Interview Chat
          </h1>
        </div>
      </header>
      <div className="flex flex-1">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto">
            {/* Chat messages */}
            {/* Simulated chat messages */}
            <div className="p-6 space-y-4">
              {/* Example chat message 1 */}
              <div className="flex justify-end">
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-900 dark:text-gray-50">
                      Hello, thanks for joining us today. I'm excited to learn
                      more about your background and experience.
                    </p>
                  </div>
                  <Avatar className="shrink-0">
                    <AvatarImage
                      alt="Interviewer"
                      src="/placeholder-avatar.jpg"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              {/* Example chat message 2 */}
              <div className="flex justify-start">
                <div className="flex items-center gap-4">
                  <Avatar className="shrink-0">
                    <AvatarImage
                      alt="Candidate"
                      src="/placeholder-avatar.jpg"
                    />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-900 dark:text-gray-50">
                      Hello, it's great to meet you. I'm excited to discuss my
                      background and experience with you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 border-t p-4">
            <Input
              className="flex-1 rounded-md border-gray-300 bg-gray-100 p-2 text-sm focus:border-gray-500 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-gray-600 dark:focus:ring-gray-600"
              placeholder="Type your response..."
            />
            <Button size="sm">Send</Button>
          </div>
        </div>
        <div className="w-72 bg-gray-50 p-6 dark:bg-gray-900">
          {/* Profile section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage alt="Candidate" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                  Jared Palmer
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Software Engineer
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                About
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Jared is a skilled software engineer with 5 years of experience
                in web development. He has a strong background in React,
                Node.js, and cloud-based architectures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
