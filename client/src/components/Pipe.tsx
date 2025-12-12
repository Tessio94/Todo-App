const Pipe = () => {
	return (
		<>
			<div className="absolute left-5 lg:left-10 2xl:left-20 w-full z-20 md:block hidden">
				<div className="relative w-1/2 aspect-[1440/421]">
					<div className="absolute top-0 p-3 bg-gradient-to-br from-purple-600 to-orange-600 rounded-2xl text-slate-100 font-bold border-2 border-purple-800 text-xl z-20 -translate-y-1/2 -left-2 shadow-lg shadow-purple-600/50">
						Register
					</div>
					<div className="absolute bottom-0 p-3 bg-gradient-to-br from-purple-600 to-orange-600 rounded-2xl text-slate-100 font-bold border-2 border-purple-800 text-xl z-20 translate-y-1/2 -left-2 min-w-[105px] text-center shadow-lg shadow-purple-600/50">
						Login
					</div>
					<svg
						className="absolute w-full"
						viewBox="0 0 1440 421"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0 2C712.748 2 712.748 180 1440 180"
							stroke="#D5D5D5"
							strokeWidth="4"
						/>
						<path
							d="M0 419C718.244 419 715.733 241 1439 241"
							stroke="#D5D5D5"
							strokeWidth="4"
						/>
					</svg>
					<svg
						className="absolute w-full"
						viewBox="0 0 1440 421"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<defs>
							<linearGradient id="gradient">
								<stop offset="0" stopColor="white" stopOpacity="0" />
								<stop offset="0.8" stopColor="white" stopOpacity="1" />
								<stop offset="0.8" stopColor="white" stopOpacity="0" />
							</linearGradient>

							<mask id="gradient-mask">
								<rect
									className="mask-rect"
									x="0%"
									y="0"
									width="100%"
									height="100%"
									fill="url(#gradient)"
								/>
							</mask>
						</defs>
						<path
							d="M0 2C712.748 2 712.748 180 1440 180"
							stroke="#9333ea"
							strokeWidth="4"
							mask="url(#gradient-mask)"
						/>
						<path
							d="M0 419C718.244 419 715.733 241 1439 241"
							stroke="#ea580c"
							strokeWidth="4"
							mask="url(#gradient-mask)"
						/>
					</svg>
				</div>
			</div>
			<div className="absolute w-full right-5 lg:right-10 2xl:right-20 [transform:rotateY(180deg)] z-20 md:block hidden">
				<div className="relative w-1/2 aspect-[1440/421]">
					<div className="absolute top-0 p-3 bg-gradient-to-br from-purple-600 to-orange-600 rounded-2xl text-slate-100 font-bold border-2 border-purple-800 text-xl z-20 -left-2 min-w-[105px] text-center [transform:rotateY(180deg)_translateY(-50%)] shadow-lg shadow-purple-600/50">
						Create
					</div>
					<div className="absolute top-1/2 p-3 bg-gradient-to-br from-purple-600 to-orange-600 rounded-2xl text-slate-100 font-bold border-2 border-purple-800 text-xl z-20  -left-2 min-w-[105px] text-center [transform:rotateY(180deg)_translateY(-50%)] lg:[transform:rotateY(180deg)_translateY(-65%)] shadow-lg shadow-purple-600/50">
						Update
					</div>
					<div className="absolute bottom-0 p-3 bg-gradient-to-br from-purple-600 to-orange-600 rounded-2xl text-slate-100 font-bold border-2 border-purple-800 text-xl z-20  -left-2 min-w-[105px] text-center [transform:rotateY(180deg)_translateY(50%)] shadow-lg shadow-purple-600/50">
						Delete
					</div>
					<svg
						className="absolute w-full"
						viewBox="0 0 1440 421"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0 2C712.748 2 712.748 180 1440 180"
							stroke="#D5D5D5"
							strokeWidth="4"
						/>
						<path
							d="M0 419C718.244 419 715.733 241 1439 241"
							stroke="#D5D5D5"
							strokeWidth="4"
						/>
						<path d="M7 198L1439.5 214" stroke="#D5D5D5" strokeWidth="4" />
					</svg>
					<svg
						className="absolute w-full"
						viewBox="0 0 1440 421"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<defs>
							<linearGradient id="gradientRight">
								<stop offset="0" stopColor="white" stopOpacity="0" />
								<stop offset="0.8" stopColor="white" stopOpacity="1" />
								<stop offset="0.8" stopColor="white" stopOpacity="0" />
							</linearGradient>

							<mask id="gradient-mask-right">
								<rect
									className="mask-rect-right"
									x="0%"
									y="0"
									width="100%"
									height="100%"
									fill="url(#gradientRight)"
								/>
							</mask>
						</defs>
						<path
							d="M0 2C712.748 2 712.748 180 1440 180"
							stroke="#9333ea"
							strokeWidth="4"
							mask="url(#gradient-mask-right)"
						/>
						<path
							d="M0 419C718.244 419 715.733 241 1439 241"
							stroke="#ea580c"
							strokeWidth="4"
							mask="url(#gradient-mask-right)"
						/>
						<path
							d="M7 198L1439.5 214"
							stroke="#ffffff"
							strokeWidth="4"
							mask="url(#gradient-mask-right)"
						/>
					</svg>
				</div>
			</div>
		</>
	);
};

export default Pipe;
