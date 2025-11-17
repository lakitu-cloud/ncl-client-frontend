
import { Line } from "../../assets/dummy";

const backImage = require("../../assets/images/background2.jpg")
const meterImage = require("../../assets/images/meter.png")

const A = require("../../assets/images/brand/1.png");
const B = require("../../assets/images/brand/2.png");
const C = require("../../assets/images/brand/3.png");
const D = require("../../assets/images/brand/4.png");
const E = require("../../assets/images/brand/5.png");
const F = require("../../assets/images/gallery/ins2.jpeg")
const G = require("../../assets/images/gallery/ins3.jpeg")
const H = require("../../assets/images/gallery/man.jpeg")


export const Home = () => {
  return (
    <div className="bg-white flex justify-center w-full overflow-x-hidden">
      <div className="flex flex-col min-h-screen w-full">
        {/* Header Section */}
        <header className="relative bg-[#021f89] font-oswald w-full h-auto py-4 px-6 md:px-12 flex justify-between items-center">
          <div className="text-white font-bold text-2xl">
            NYIRENDAS <span className="hidden sm:inline-block text-xl font-normal">HYDROXY METER</span>
          </div>
          {/* <div className="hidden md:flex space-x-6 text-white text-lg">
            <a href="#" className="hover:text-gray-300">Product</a>
            <a href="#" className="hover:text-gray-300">Company</a>
            <a href="#" className="hover:text-gray-300">Pricing</a>
          </div> */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2 text-white">
              {/* <img src={languageIcon} alt="Language" className="h-6" /> */}
              <span className="hidden">SW</span>
            </div>
            <div className="ml-4 md:block">
              <button className="bg-white text-[#021f89] font-bold py-2 px-4 rounded hover:bg-gray-200 transition duration-300">
                <a href="/auth" className="text-sm text-nowrap"> Get Started </a>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative bg-black">
          <div className="absolute inset-0 bg-gradient-to-r from-black z-10 opacity-80"></div>
          <img src={backImage} alt="Background" className="absolute inset-0 w-full h-1/2 md:h-full z-0 object-cover" />

          {/* Meter Image and Descriptions */}
          <div className="absolute inset-0 z-20 w-full h-full flex items-center justify-center">
            <div className="relative max-w-[120px] md:max-w-[240px] lg:max-w-[326px] left-[88px] top-[-138px] md:left-[168px] lg:left-[230px] md:top-3.5">
              <img src={meterImage} alt="Meter" width="840" height="auto" className="block" />

              {/* Feature descriptions */}
              <div className="hidden md:block absolute text-white font-semibold text-sm md:bottom-[314px] lg:bottom-[412px] md:left-[-112px] lg:left-[-82px]">
                <div className="relative max-w-[175px]">
                  <p>Long lasting battery</p>
                  <p>of 6 to 8 years of charge</p>
                  <div className="absolute transform scale-y-[-1] bottom-[-50px] right-0 max-w-[175px] flex justify-end overflow-hidden">
                    <Line />
                  </div>
                </div>
              </div>

              <div className="hidden md:block absolute text-white font-semibold text-sm bottom-[58px] md:left-[-152px] lg:left-[-140px]">
                <div className="relative max-w-[200px]">
                  <p>IP68 Protection</p>
                  <p>against water and dust</p>
                  <div className="absolute bottom-[-10px] left-0 max-w-[206px] flex justify-end overflow-hidden">
                    <Line />
                  </div>
                </div>
              </div>

              <div className="hidden md:block absolute text-white font-semibold text-sm bottom-[-28px] md:right-[-92px] lg:right-[-74px]">
                <div className="relative max-w-[280px] lg:max-w-[250px]">
                  <p>Enjoy the most efficient repayment</p>
                  <p>with STS token technology</p>
                  <div className="absolute bottom-[-10px] left-[-12px] transform scale-x-[-1] max-w-[258px] flex justify-end overflow-hidden">
                    <Line />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Big Text Section */}
          <div className="container  min-h-[568px] lg:min-h-[760px] text-white pt-[230px] md:pt-[170px] lg:pt-[184px] relative z-20 xs:px-8">
            <div className="">
              <h1 className="font-semibold font-oswald leading-10 text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 ">
                <p>HARNESS</p>
                <p>THE POWER OF</p>
                <p>STS WATER METER</p>
              </h1>
              <a href="#" className="inline-block focus:outline-none ignore-has-link">
                <div className="flex items-center justify-center w-full uppercase transition-all duration-200 rounded-md font-oswald bg-blue-800 text-white hover:bg-blue-800 px-4 text-lg leading-6 py-2 md:text-xl md:py-4">
                  <div className="font-medium text-left">Discover More</div>
                </div>
              </a>
            </div>

            <div className="flex flex-col items-start md:items-center md:flex-row font-oswald font-semibold mt-[42px] md:mt-[100px] lg:mt-36">
              <a href="/products">JOIN OUR WISHLIST &gt;&gt;</a>
              <span className="w-px my-1 ml-2 md:my-0 md:mx-6 transform rotate-90 md:rotate-0">|</span>
              <button type="button" className="cursor-pointer font-semibold outline-none focus:outline-none">REACH OUT TO US &gt;&gt;</button>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="container mx-auto text-white py-12 px-4 md:py-26 md:px-8">
          <h2 className="text-3xl text-gray-600 font-oswald text-center mb-12">Our Partners and Clients</h2>
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-3 sm:grid-cols-5 px-24 mt-8 mx-auto">
            <img
              src={A}
              alt="Costech logo"
              className="w-16 md:w-20 h-auto object-cover"
            />
            <img src={B} alt="Partner" className="w-16 md:w-20 h-auto object-cover" />
            <img src={C} alt="Logo" className="w-16 md:w-20 h-auto object-cover" />
            <img src={D} alt="Ruwasa" className="w-16 md:w-20 h-auto object-cover" />
            <img src={E} alt="Logo" className="w-16 md:w-20 h-auto object-cover" />
          </div>
        </section>

        {/* Our focus */}
        <section className="pb-12 md:pb-16 lg:pb-24 px-4 md:px-8 lg:px-16">

          <h2 className="text-center text-blue-800 text-2xl md:text-4xl lg:text-6xl font-bold uppercase mb-4 md:mb-8 font-oswald">Our Focus</h2>
          <p className="mx-auto text-center max-w-2xl text-gray-600 font-poppins mb-8 md:mb-12">
            When developing our products, we primarily focus on three main pillars - reliability, security, and ease of use. We believe these elements are essential for the success of any IoT project.
          </p>


          {/* Feature Section */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
            <div className="bg-slate-200 rounded-xl p-6 md:p-8 flex-1 min-w-[250px] max-w-xs md:max-w-md text-center">
              <h3 className="text-blue-800 font-oswald font-semibold text-2xl lg:text-3xl mb-2">
                DESIGN
              </h3>
              <p className="text-gray-600 text-sm font-poppins">
                Nyirendas company brightest minds are behind the design of our connectivity products. Located in SIDO, Dar es Salaam, our in-house R&D develops new products quickly and efficiently, responding to market needs. At the same time, we continuously enhance our existing portfolio by adding new features and expanding functionality.
              </p>
            </div>

            <div className="bg-slate-200 rounded-xl p-6 md:p-8 flex-1 min-w-[250px] max-w-xs md:max-w-md text-center">
              <h3 className="text-blue-800 font-oswald font-semibold text-2xl lg:text-3xl mb-2">
                MANUFACTURE
              </h3>
              <p className="text-gray-600 font-poppins text-sm">
                Hydroxy prepaid water devices are manufactured and assembled in our leading-edge manufacturing facility in SIDO vingunguti, Dar es Salaam. Having in-house manufacturing allows our engineers to ensure the highest quality of all our products. Every single piece is extensively tested before leaving our warehouse.
              </p>
            </div>

            <div className="bg-slate-200 rounded-xl p-6 md:p-8 flex-1 min-w-[250px] max-w-xs md:max-w-md text-center">
              <h3 className="text-blue-800 font-oswald font-semibold text-2xl lg:text-3xl mb-2">
                INSTALLATION
              </h3>
              <p className="text-gray-600 font-poppins text-sm">
                Our experienced team ensures seamless installation of the prepaid water meters, adapting to various environments across the country. We prioritize minimal disruption and guarantee that the system integrates smoothly with existing infrastructure, ensuring immediate operational efficiency upon setup.
              </p>
            </div>
          </div>
        </section>


        {/* Our Products */}
        <section className="flex justify-center items-center w-full ">
          <div className="container mx-auto px-4 md:px-8 flex flex-col bg-gray-100 rounded-lg py-8 md:flex-row items-center">

            <div className="md:w-1/2 flex justify-center">
              <img
                src={require("../../assets/images/meter_alt.png")}
                loading="lazy"
                alt="image alt"
                className="w-40 md:w-60 h-auto object-contain"
              />

            </div>
            <div className="md:mt-0 md:ml-8 md:flex flex-col justify-center md:border-t md:border-b border-gray-300 flex-1 md:min-w-[320px]">
              <h3 className="text-blue-800 uppercase mb-2 text-2xl md:text-3.5xl font-semibold font-oswald">
                Hydroxy Prepaid Water Meter
              </h3>
              <div className="text-left max-w-4xl text-gray-700 mb-2 whitespace-pre-wrap hidden md:block font-poppins">
                <p>
                The Hydroxy Prepaid Water Meter provides reliable water usage tracking and payment solutions, offering both residential and commercial customers a convenient and secure method for managing water consumption.                </p>
              </div>
              <div>
                <div className="mt-4 flex items-center space-x-4 py-2">
                  <img src={require("../../assets/images/logo/1.png")} alt="IP68" className="w-10 h-10 bg-[#022089] px-2 py-2 rounded-lg" />
                  <p className="text-gray-500 font-poppins">IP68 Protected Casing</p>
                </div>
                <div className="flex items-center space-x-4 py-2">
                  <img src={require("../../assets/images/logo/2.png")} alt="STS" className="w-10 h-10 bg-[#022089] px-2 py-2 rounded-lg" />
                  <p className="text-gray-500 font-poppins">STS Token Repayment</p>
                </div>
                <div className="flex items-center space-x-4 py-2">
                  <img src={require("../../assets/images/logo/3.png")} alt="Mobile" className="w-10 h-10 bg-[#022089] px-2 py-2 rounded-lg" />
                  <p className="text-gray-500 font-poppins">Mobile Payment</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Software */}
        <section className="flex justify-center items-center w-full ">
          <div className="container mx-auto md:px-8 flex flex-col md:flex-row justify-center  items-center bg-gray-100 mt-20">
            <div className="mt-2 md:mt-0 md:mr-8 md:flex flex-col justify-center md:border-t md:border-b border-gray-300 flex-1 md:min-w-[320px] md:py-4 ">
              <h3 className="text-blue-800 uppercase mb-2 text-2xl md:text-3.5xl font-semibold font-oswald">
                Hydroxy Prepaid Water Meter
              </h3>
              <div className="text-left max-w-4xl mb-4 text-gray-700 whitespace-pre-wrap hidden md:block font-poppins">
              <p>
          Our software offers complete management of prepaid water meters, allowing utility providers to monitor, track, and manage water usage, payments, and meter data from a centralized platform.
        </p>
              </div>
              <div>
                <div className="flex items-center space-x-4 py-2">
                  <img src={require("../../assets/images/logo/meter_logo.png")} alt="IP68" className="w-10 h-10 bg-[#022089] px-2 py-2 rounded-lg" />
                  <p className="text-gray-500 font-poppins">Meter Management</p>
                </div>
                <div className="flex items-center space-x-4 py-2">
                  <img src={require("../../assets/images/logo/user_logo.png")} alt="STS" className="w-10 h-10 bg-[#022089] px-2 py-2 rounded-lg" />
                  <p className="text-gray-500 font-poppins">Manage your Subscribers</p>
                </div>
                <div className="flex items-center space-x-4 py-2">
                  <img src={require("../../assets/images/logo/transactions_logo.png")} alt="Mobile" className="w-10 h-10 bg-[#022089] px-2 py-2 rounded-lg" />
                  <p className="text-gray-500 font-poppins">Make Transactions seamlessly</p>
                </div>
              </div>
            </div>
            <div className="custom-width">
              <div className="relative pb-3/5 md:pb-2/3 rounded-xl">
                <img
                  src={require("../../assets/images/desktop.png")}
                  alt="software"
                  loading="lazy"
                  className="w-[640px] h-auto object-cover object-right"
                />
              </div>
            </div>
          </div>
        </section>


        {/* Our Gallery */}
        <section className="items-center px-4 pt-16 md:pt-24 mb-12 w-full justify-center overflow-x-auto scroll-m-4 ">
          <div className="flex flex-col items-center justify-center mb-6">
            <h2 className="text-center text-blue-800 text-2xl md:text-6xl md:leading-72 font-bold uppercase mb-2 md:mb-4 whitespace-pre-wrap font-oswald">
              OUR GALLERY
            </h2>
            <div className="">
              <a href="#" className="link underline underline-offset-2 bg-gray-200 px-2 py-1 rounded-lg font-poppins text-gray-600 text-base text-center md:-mb-4">
                see more+
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center mt-12 whitespace-nowrap c-hide-scrollbar -mx-5 md:whitespace-normal md:mx-0 md:w-full">

            {/* Image Card */}
            {[
              {
                src: require("../../assets/images/gallery/man.jpeg"),
                date: "September 17, 2024",
                title: "Manufucturing of prepaid water meter",
              },
              {
                src: require("../../assets/images/gallery/ins2.jpeg"),
                date: "September 11, 2024",
                title: "Installation of Prepaid Water Meters in Kisiju",
              },
              {
                src: require("../../assets/images/gallery/ins3.jpeg"),
                date: "September 4, 2024",
                title: "Installation of Prepaid Water Meters in Kisemvule",
              },
            ].map((item, index) => (
              <div key={index} className="flex-1 border-r  border-gray-300 mr-4 pr-4 last:mr-5 first:ml-5 last:pr-0 md:border-none md:max-w-md">
                <a href="#" className="block min-w-[226px] md:w-full">
                  <div className="relative mb-2 pb-2/3 rounded-xl overflow-hidden">
                    <img src={item.src} alt="article" className="w-full h-80 object-cover" />
                    <div className="custom-gradient absolute inset-0"></div>
                  </div>
                  <div className="text-xs capitalize text-gray-500 whitespace-nowrap md:text-right">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block mr-2 -mt-1 align-middle icon sprite-globals">
                      <use href="/_nuxt/b26c2a3e8e08968fd3a076422b8988bf.svg#i-clock"></use>
                    </svg>
                    {item.date}
                  </div>
                  <div className="font-oswald font-semibold text-black uppercase whitespace-normal mt-2 md:text-2xl">
                    {item.title}
                  </div>
                </a>
              </div>
            ))}

          </div>
        </section>

        <section className="flex items-start justify-center px w-full mb-16 md:mb-24">
          <div className="bg-blue-800 text-white rounded-xl p-4 lg:px-16 lg:py-12">
            <div className="lg:flex items-center justify-between"><div className="font-oswald flex-1 lg:flex-none font-semibold text-2xl lg:text-3.5xl mb-2 lg:mb-0 uppercase">
              GET THE LATEST NEWS TO YOUR INBOX
            </div>
              <div className="flex-1">
                <form className="flex items-baseline justify-center text-left sm:block w-full">
                  <div className="w-full lg:flex items-start">
                    <div className="flex-1 lg:mr-2 lg:ml-16 relative" data-v-95cdc4d6="">
                      <div className="px-3 py-2 min-h-[48px] rounded-lg transition duration-150 group shadow-component-input text-gray-400 shadow-outline-gray group-hover:border-gray-4 focus:shadow-outline-white-2x focus-within:shadow-outline-white-2x hover:border-gray-600 hover:focus-within:border-gray-4 bg-gray-800 border-white" data-v-95cdc4d6="">
                        <label htmlFor="1727535161759" className="block text-xs overflow-hidden h-4 group-hover:text-white group-focus:text-white" data-v-95cdc4d6="">Your email address</label>
                        <div className="text-gray-400" data-v-95cdc4d6="">
                          <input id="1727535161759" type="text" name="" value="" className="appearance-none outline-none block bg-transparent text-current font-medium w-full" data-v-95cdc4d6="" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        tabIndex={1}
                        type="button"
                        className="inline-block focus:outline-none ignore-has-link mt-6 lg:m-0 lg:mt-1 w-full lg:w-auto width--large">
                        <div tabIndex={-1} className="flex items-center justify-center w-full uppercase transition-all duration-200 rounded-md content font-oswald md:w-auto bg-white text-blue-800 hover:bg-gray-2 hover:text-white active-border--light px-4 text-lg leading-6 py-2 md:text-base px--small ">
                          <div className="font-medium text-left">
                            Sign me up</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 md:py-14 bg-slate-600 mt-auto">
          <div className="container mx-auto">
            <div className="md:flex justify-between md:mb-14"><div className="flex flex-wrap justify-between md:justify-start"><div className="odd:mr-3 xs:mr-3 w-[134px] md:w-[200px] mb-10 md:mb-0"><div className="font-semibold font-oswald text-white mb-2">
              OTHER FIELD
            </div>
              <ul>
                <li>
                  <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">ALl relevant area of expertise</a>
                </li>
                <li>
                  <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Industrial &amp; automation</a>
                </li>
                <li>
                  <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Energy &amp; utilities</a>
                </li>
                <li>
                  <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Smart city</a>
                </li>
                <li>
                  <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Transportation</a>
                </li>
                <li>
                  <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Enterprise</a>
                </li>
                <li>
                  <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Retail</a>
                </li>
              </ul>
            </div>
              <div className="odd:mr-3 xs:mr-3 w-[134px] md:w-[200px] mb-10 md:mb-0">
                <div className="font-semibold font-oswald text-white mb-2">
                  PRODUCTS
                </div>
                <ul>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Remote Management System</a>
                  </li>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Water Meter</a>
                  </li>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Energy Meter</a>
                  </li>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Soil Tester</a>
                  </li>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">GPS</a>
                  </li>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3"></a>
                  </li>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3"></a>
                  </li>
                </ul>
              </div>
              <div className="odd:mr-3 xs:mr-3 w-[134px] md:w-[200px] mb-10 md:mb-0"><div className="font-semibold font-oswald text-white mb-2">
                SUPPORT
              </div>
                <ul>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Product support</a>
                  </li>
                  <li>
                    <a href="#" target="_blank" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3"></a>
                  </li>
                  <li>
                    <a href="#" target="_blank" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3"></a>
                  </li>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3"></a>
                  </li>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3"></a>
                  </li>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3"></a>
                  </li>
                </ul>
              </div>
              <div className="odd:mr-3 xs:mr-3 w-[134px] md:w-[200px] mb-10 md:mb-0">
                <div className="font-semibold font-oswald text-white mb-2">
                  ABOUT US
                </div>
                <ul>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Who we are</a>
                  </li>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Mission, vision &amp; values</a>
                  </li>
                  <li>
                    <a href="#" target="_blank" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Brand guidelines</a>
                  </li>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Career</a>
                  </li>
                  <li>
                    <a href="#" target="_self" className="block py-2 text-sm text-white transition duration-200 cursor-pointer hover:text-gray-3">Contacts</a>
                  </li>
                </ul>
              </div>
            </div>
              <div className="flex-shrink-0">
                <div className="md:flex justify-end mb-10">
                  <a href="#" target="_blank" className="flex items-center text-white mr-6 last:mr-0 transition duration-200 hover:text-gray-3 font-oswald mb-8 last:mb-0 md:mb-0">

                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 icon sprite-globals"><use href="/_nuxt/b26c2a3e8e08968fd3a076422b8988bf.svg#i-chevron-thin" ></use></svg>
                  </a>
                  <a href="#" target="_blank" className="flex items-center text-white mr-6 last:mr-0 transition duration-200 hover:text-gray-3 font-oswald mb-8 last:mb-0 md:mb-0">
                    JOIN THE ACADEMY
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 icon sprite-globals"><use href="/_nuxt/b26c2a3e8e08968fd3a076422b8988bf.svg#i-chevron-thin" ></use></svg></a>
                </div>
                <div className="mb-10 md:flex justify-end">
                  <div>
                    <form action="post" className="flex items-baseline justify-center text-left sm:block w-full">
                      <button tabIndex={0} type="button" className="inline-block focus:outline-none ignore-has-link w-full width--large">
                        <div tabIndex={-1} className="flex items-center justify-center w-full uppercase transition-all duration-200 rounded-md content font-oswald md:w-auto bg-transparent text-white border--white hover:bg-white hover:text-blue-800 active-border--light px-4 text-lg leading-6 py-2 md:text-base px--small ">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 icon sprite-globals">
                            <use href="/_nuxt/b26c2a3e8e08968fd3a076422b8988bf.svg#i-paper-plane">
                            </use>
                          </svg>
                          <div className="font-medium text-left">SUBSCRIBE TO NEWSLETTER
                          </div>
                          </div>
                          </button>
                          </form>
                          </div>
                          </div>
                           <div className="flex justify-between mb-10 md:mb-0 max-w-[320px] w-full md:w-auto mx-auto"><a target="_blank" href="https://www.linkedin.com/company/teltonika-networks/" rel="noreferrer" aria-label="linkedin" className="transition transform duration-200 hover:scale-110 mr-5 last:mr-0"><svg xmlns="http://www.w3.org/2000/svg" className="w-[32px] h-[32px] text-white icon sprite-globals"><use href="/_nuxt/b26c2a3e8e08968fd3a076422b8988bf.svg#i-linkedin" ></use></svg></a><a target="_blank" href="https://www.youtube.com/TeltonikaNetworks" rel="noreferrer" aria-label="youtube" className="transition transform duration-200 hover:scale-110 mr-5 last:mr-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-[32px] h-[32px] text-white icon sprite-globals"><use href="/_nuxt/b26c2a3e8e08968fd3a076422b8988bf.svg#i-youtube"></use></svg></a><a target="_blank" href="https://www.facebook.com/teltonikanetworks/" rel="noreferrer" aria-label="facebook" className="transition transform duration-200 hover:scale-110 mr-5 last:mr-0"><svg xmlns="http://www.w3.org/2000/svg" className="w-[32px] h-[32px] text-white icon sprite-globals"><use href="/_nuxt/b26c2a3e8e08968fd3a076422b8988bf.svg#i-facebook" ></use></svg></a><a target="_blank" href="https://twitter.com/TeltonikaNET" rel="noreferrer" aria-label="twitter" className="transition transform duration-200 hover:scale-110 mr-5 last:mr-0"><svg xmlns="http://www.w3.org/2000/svg" className="w-[32px] h-[32px] text-white icon sprite-globals"><use href="/_nuxt/b26c2a3e8e08968fd3a076422b8988bf.svg#i-twitter"></use></svg></a><a target="_blank" href="https://www.instagram.com/teltonikanetworksofficial/" rel="noreferrer" aria-label="instagram" className="transition transform duration-200 hover:scale-110 mr-5 last:mr-0"><svg xmlns="http://www.w3.org/2000/svg" className="w-[32px] h-[32px] text-white icon sprite-globals"><use href="/_nuxt/b26c2a3e8e08968fd3a076422b8988bf.svg#i-instagram"></use></svg></a></div></div></div> <div className="h-px w-full bg-white mb-2 hidden md:block"></div> <div className="flex flex-col-reverse md:flex-row items-center md:justify-between w-full"><div className="text-xs text-white">
                            COPYRIGHT
                            <span>© NYIRENDAS, 2024</span>
                          </div>
              <div className="flex flex-wrap md:flex-nowrap justify-center mb-6 md:mb-0">
                <div className="group flex text-white text-xs items-center mb-4 md:mb-0 px-3 md:px-0">
                  <a href="/about-us/policies-certificates/privacy-policy" className="block transition duration-200 hover:text-gray-3">
                    <span>PRIVACY</span>
                  </a>
                  <span className="hidden md:block px-4 group-last:hidden">|</span>
                </div>
                <div className="group flex text-white text-xs items-center mb-4 md:mb-0 px-3 md:px-0">
                  <a href="#" className="block transition duration-200 hover:text-gray-3">
                    <span>COOKIES</span>
                  </a>
                  <span className="hidden md:block px-4 group-last:hidden">|</span></div><div className="group flex text-white text-xs items-center mb-4 md:mb-0 px-3 md:px-0"><a href="/about-us/policies-certificates" className="block transition duration-200 hover:text-gray-3">
                    <span>ALL POLICIES</span>
                  </a>
                  <span className="hidden md:block px-4 group-last:hidden">|</span>
                </div>
                <button type="button" aria-label="Cookies settings" className="flex transition duration-200 hover:text-gray-3 text-white text-xs uppercase mb-4 md:mb-0 px-3 md:px-0">
                  Cookies Settings
                </button>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};


export default Home;