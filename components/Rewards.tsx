
export default function Rewards() {
    return (
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">BattlePass Rewards</h2>
          </div>
  
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
            <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2 relative">
              <img
                src="https://149354818.v2.pressablecdn.com/wp-content/uploads/2023/02/NOT-live-photo.jpeg"
                alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
                className="object-cover object-center group-hover:opacity-75"
              />
              <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
              <div className="flex items-end p-6 absolute inset-0 z-10">
                <div>
                  <h3 className="font-semibold text-white">
                    <a href="#">
                      <span className="absolute inset-0" />
                      $not Concert Tickets
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full relative">
              <img
                src="https://store-images.s-microsoft.com/image/apps.47297.65471472762928511.11f5eb5b-9b71-4db0-a90c-b29ecbb3fc10.e97006ff-95a1-4d45-af16-6f0a4328848f?q=90&w=480&h=270"
                alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
                className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
              />
              <div className="flex items-end p-6 absolute inset-0">
                <div>
                  <h3 className="font-semibold text-white">
                    <a href="#">
                      <span className="absolute inset-0" />
                      Virtual Currency
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full relative">
              <img
                src="https://media.nbcchicago.com/2022/09/GettyImages-535640865.jpg?quality=85&strip=all&resize=850%2C478"
                alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
              />
              <div className="flex items-end p-6 absolute inset-0">
                <div>
                  <h3 className="font-semibold text-white">
                    <a href="#">
                      <span className="absolute inset-0" />
                      Movie Theatre Tickets
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  