import { FaPassport } from "react-icons/fa";
import { BsFillTaxiFrontFill } from "react-icons/bs";
import { BiPulse } from "react-icons/bi";
import { MdOutlineApartment, MdFlight, MdLocationOn } from "react-icons/md";

import React from 'react';
import { useItineraryStore } from '../store/itineraryStore';

const PDFContent: React.FC = () => {
    const { tourOverview, dailyItinerary, flights, hotels, paymentPlan, inclusionsExclusions, activitiesData, visaDetails } = useItineraryStore();

    // Reusable Footer Component
    // const Footer = () => (
    //     <div className='bg-white border-t-2 border-gray-300 pt-4 pb-2 mt-8'>
    //         <div className='flex justify-between items-center px-6'>
    //             {/* Left - Company Details */}
    //             <div className='text-left text-xs text-gray-700'>
    //                 <p className='font-bold text-sm mb-1'>Vigovia Tech Pvt. Ltd</p>
    //                 <p>Registered Office: Hd-109 Cinnabar Hills,</p>
    //                 <p>Links Business Park, Karnataka, India.</p>
    //             </div>

    //             {/* Center - Contact Information */}
    //             <div className='text-center text-xs text-gray-700'>
    //                 <p><span className='font-semibold'>Phone:</span> +91-9504061112</p>
    //                 <p><span className='font-semibold'>Email ID:</span> Utkarsh@Vigovia.Com</p>
    //                 <p><span className='font-semibold'>CIN:</span> U79110KA2024PTC191890</p>
    //             </div>

    //             {/* Right - Logo */}
    //             <div className='text-right'>
    //                 <div className='flex flex-col items-end'>
    //                     <p className='text-2xl font-bold' style={{ color: '#7C3AED' }}>
    //                         vigovia
    //                     </p>
    //                     <p className='text-xs text-gray-600 tracking-wider'>PLAN·PACK·GO</p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div className='space-y-8 relative'>
            {/* Header */}
            <div className="flex  gap-y-2 absolute right-0 justify-center items-center font-extralight">
                <p className=' text-sm  '>Tour Code : </p>
                <p className=' '>&nbsp;{tourOverview.tourCode || 'N/A'}</p>
            </div>
            <div>
                <header className='flex justify-center items-center mb-6'>
                    <img src="logo.png" alt="logo" className='max-h-20' />
                </header>
            </div>

            {/* Title Section */}
            <div className='flex justify-center rounded-3xl bg-gradient-to-r from-blue-500 to-violet-400'>
                <h1 className='text-xl font-bold text-white flex flex-col p-5 gap-3 justify-center items-center'>
                    <span className="font-bold">
                        Hi, Traveler!
                    </span>
                    <span className="text-2xl">
                        {tourOverview.tripTitle || 'Travel Itinerary'}
                    </span>
                    <span className="font-normal text-xl">
                        {tourOverview.duration || 'Duration not specified'}
                    </span>
                    <span className="flex gap-5 text-2xl">
                        <MdFlight /> <MdOutlineApartment /> <BiPulse /> <BsFillTaxiFrontFill /> <FaPassport />
                    </span>
                </h1>
            </div>

            {/* Tour Overview */}
            {tourOverview.tripTitle && (
                <div className='bg-white rounded-2xl border-2 border-purple-600 p-2 px-6'>
                    <div className='flex justify-between gap-6 text-sm  items-center'>
                        <div className="flex flex-col gap-y-2 ">
                            <p className='  font-extrabold '>Departure From :</p>
                            <p className='font-normal '>{tourOverview.departureFrom || 'N/A'}</p>
                        </div>
                        <div className="flex flex-col gap-y-2 ">
                            <p className='  font-extrabold '>Departure :</p>
                            <p className='font-normal '>{tourOverview.departureDate || 'N/A'}</p>
                        </div>
                        <div className="flex flex-col gap-y-2 ">
                            <p className='  font-extrabold '>Arrival :</p>
                            <p className='font-normal '>{tourOverview.arrivalDate || 'N/A'}</p>
                        </div>
                        <div className="flex flex-col gap-y-2 ">
                            <p className='  font-extrabold '>Destination :</p>
                            <p className='font-normal '>{tourOverview.destination || 'N/A'}</p>
                        </div>
                        <div className="flex flex-col gap-y-2 ">
                            <p className='  font-extrabold '>NO.of Travellers :</p>
                            <p className='font-normal '>{tourOverview.numberOfTravellers}</p>
                        </div>

                    </div>
                    {tourOverview.highlights && tourOverview.highlights.length > 0 && (
                        <div>
                            <h3 className='text-lg font-semibold text-gray-800 mb-2'>Highlights</h3>
                            <ul className='list-disc list-inside space-y-1'>
                                {tourOverview.highlights.map((highlight, index) => (
                                    <li key={index} className='text-gray-700'>{highlight}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}



            {/* Daily Itinerary */}
            {dailyItinerary.length > 0 && dailyItinerary.some(day => day.title || day.city || day.timeline?.some(t => t.activities.length > 0)) && (
                <div className='bg-white rounded-lg p-6' style={{ pageBreakBefore: 'always', pageBreakInside: 'avoid' }}>
                    <h2 className='text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-purple-500'>
                        Daily <span className='text-purple-800'>Itinerary</span>
                    </h2>
                    <div className='space-y-8'>
                        {dailyItinerary.filter(day => day.title || day.city || day.timeline?.some(t => t.activities.length > 0)).map((day) => (
                            <div key={day.id} className='relative flex flex-col gap-6' style={{ pageBreakInside: 'avoid' }}>
                                {/* Day Card Container */}
                                <div className='grid grid-cols-8 gap-5'>
                                    {/* Left Side - Day Badge and Image */}
                                    <div className='flex  items-center min-w-[180px] gap-5 justify-center col-span-3 '>
                                        {/* Day Badge */}
                                        <div className='bg-[#321E5D] text-white rounded-full w-18 h-full flex items-center justify-center  '>
                                            <span className='text-md font-bold transform -rotate-90'>Day {day.dayNumber}</span>
                                        </div>

                                        {/* Circular Image Placeholder */}
                                        <div>
                                            <div className='w-40 h-40 rounded-full overflow-hidden bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center'>
                                                {day.city ? (
                                                    <img
                                                        src={`${new String(Math.ceil(Math.random() * 4))}.png`}
                                                        alt={day.city}
                                                        className='w-full h-full object-cover'
                                                    />
                                                ) : (
                                                    <MdLocationOn className='text-6xl text-white' />
                                                )}
                                            </div>
                                            <div className='text-center  mt-4'>
                                                {day.date && <p className='font-bold text-gray-800 text-lg'>{day.date}</p>}
                                                <p className='text-xs font-semibold text-gray-800 mt-1'>{day.title}</p>
                                            </div>
                                        </div>

                                        {/* Date and Title */}

                                    </div>

                                    <div className='flex-1 col-span-5  relative'>
                                        <div className='absolute left-0 top-0 bottom-0 w-1 bg-blue-300'></div>


                                        <div className='space-y-6 pl-8 flex flex-col h-full justify-between'>
                                            {day.timeline && day.timeline.map((timeSlot) => (
                                                timeSlot.activities.length > 0 && (
                                                    <div key={timeSlot.id} className='relative  '>
                                                        <div className='absolute -left-[38px] top-2 w-4 h-4 bg-white rounded-full border-4 border-purple-800'></div>
                                                        <div>
                                                            <h4 className='font-bold text-gray-800 mb-2'>{timeSlot.period}</h4>
                                                            <ul className='space-y-2'>
                                                                {timeSlot.activities.map((activity, index) => (
                                                                    <li key={index} className='text-sm text-gray-700'>
                                                                        • {activity}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                </div>
            )}



            {/* Flights */}
            {flights.length > 0 && flights.some(flight => flight.airline || flight.originCity || flight.destinationCity) && (
                <div className='bg-white rounded-lg border border-gray-200 p-6' style={{ pageBreakBefore: 'always', pageBreakInside: 'avoid' }}>
                    <h2 className='text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-500'>Flight <span className='text-purple-800'>Summary</span></h2>

                    <div className='space-y-3'>
                        {flights.filter(flight => flight.airline || flight.originCity || flight.destinationCity).map((flight) => {
                            const formatDate = (dateStr: string) => {
                                if (!dateStr) return '';
                                const date = new Date(dateStr);
                                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}'${date.getFullYear().toString().slice(-2)}`;
                            };

                            return (
                                <div key={flight.id} className='flex items-center border border-gray-300 rounded-lg overflow-hidden bg-[#F9EEFF] '>
                                    {/* Date Badge */}
                                    <div className='bg-purple-100 px-4 py-3 border-r border-gray-300 min-w-[140px] relative'>
                                        <div className='absolute right-0 top-0 bottom-0 w-0 h-0'
                                            style={{
                                                borderTop: '28px solid transparent',
                                                borderBottom: '28px solid transparent',
                                                borderLeft: '15px solid rgb(243 232 255)',
                                                marginTop: 'auto',
                                                marginBottom: 'auto'
                                            }}
                                        />
                                        <p className='font-semibold text-sm text-gray-800'>{formatDate(flight.date)}</p>
                                    </div>

                                    {/* Flight Details */}
                                    <div className='flex-1 px-4 py-3'>
                                        <p className='text-sm text-gray-800'>
                                            <span className='font-bold'>Fly {flight.airline}</span>
                                            {flight.flightNumber && <span> ({flight.flightNumber})</span>}
                                            {' '}From <span className='font-semibold'>{flight.originCity} ({flight.originCode})</span>
                                            {' '}To <span className='font-semibold'>{flight.destinationCity} ({flight.destinationCode})</span>.
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Footer Note */}
                        <div className='mt-4 pt-3 border-t border-gray-200'>
                            <p className='text-xs text-gray-600'>
                                <span className='font-semibold'>Note:</span> All Flights Include Meals, Seat Choice (Excluding XL), And 20kg/25kg Checked Baggage.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Hotels */}
            {hotels.length > 0 && hotels.some(hotel => hotel.city || hotel.hotelName) && (
                <div className='bg-white rounded-lg border border-gray-200 p-6' style={{ pageBreakInside: 'avoid' }}>
                    <h2 className='text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-500'>
                        Hotel <span className='text-purple-800'>Bookings</span>
                    </h2>

                    {/* Table */}
                    <div className='overflow-hidden rounded-lg '>
                        {/* Table Header */}
                        <div className='grid grid-cols-5  text-white gap-2'>
                            <div className='px-4 py-3 font-semibold bg-purple-900 text-sm border-r rounded-tr-lg rounded-tl-lg border-purple-700 text-center'>City</div>
                            <div className='px-4 py-3 font-semibold bg-purple-900 text-sm border-r rounded-tr-lg rounded-tl-lg border-purple-700 text-center'>Check In</div>
                            <div className='px-4 py-3 font-semibold bg-purple-900 text-sm border-r rounded-tr-lg rounded-tl-lg border-purple-700 text-center'>Check Out</div>
                            <div className='px-4 py-3 font-semibold bg-purple-900 text-sm border-r rounded-tr-lg rounded-tl-lg border-purple-700 text-center'>Nights</div>
                            <div className='px-4 py-3 font-semibold bg-purple-900 rounded-tr-lg rounded-tl-lg text-sm text-center'>Hotel Name</div>
                        </div>

                        {/* Table Body */}
                        <div>
                            {hotels.filter(hotel => hotel.city || hotel.hotelName).map((hotel, index) => (
                                <div
                                    key={hotel.id}
                                    className={`grid grid-cols-5 gap-2`}
                                >
                                    <div className={`px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center ${index === hotels.filter(h => h.city || h.hotelName).length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''}`}>{hotel.city}</div>
                                    <div className={`px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center ${index === hotels.filter(h => h.city || h.hotelName).length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''}`}>
                                        {hotel.checkIn ? new Date(hotel.checkIn).toLocaleDateString('en-GB') : ''}
                                    </div>
                                    <div className={`px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center ${index === hotels.filter(h => h.city || h.hotelName).length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''}`}>
                                        {hotel.checkOut ? new Date(hotel.checkOut).toLocaleDateString('en-GB') : ''}
                                    </div>
                                    <div className={`px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center ${index === hotels.filter(h => h.city || h.hotelName).length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''}`}>{hotel.nights}</div>
                                    <div className={`px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 text-center ${index === hotels.filter(h => h.city || h.hotelName).length - 1 ? ' rounded-bl-lg rounded-br-lg' : ''}`}>{hotel.hotelName}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Notes */}
                    <div className='mt-4 space-y-1 text-xs text-gray-700'>
                        <p>1. All Hotels Are Tentative And Can Be Replaced With Similar.</p>
                        <p>2. Breakfast Included For All Hotel Stays.</p>
                        <p>3. All Hotels Will Be 4* And Above Category.</p>
                        <p>4. A maximum occupancy of 2 people/room is allowed in most hotels.</p>
                    </div>
                </div>
            )}

            {/* Important Notes */}
            <div className='bg-white rounded-lg border border-gray-200 p-6' style={{ pageBreakInside: 'avoid' }}>
                <h2 className='text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-500'>
                    Important <span className='text-purple-800'>Notes</span>
                </h2>

                {/* Table */}
                <div className='overflow-hidden rounded-lg'>
                    {/* Table Header */}
                    <div className='grid grid-cols-12 text-white gap-2'>
                        <div className='col-span-3 px-4 py-3 font-semibold bg-purple-900 text-sm border-r rounded-tr-lg rounded-tl-lg border-purple-700 text-center'>Point</div>
                        <div className='col-span-9 px-4 py-3 font-semibold bg-purple-900 text-sm rounded-tr-lg rounded-tl-lg text-center'>Details</div>
                    </div>

                    {/* Table Body */}
                    <div>
                        {/* Row 1 */}
                        <div className='grid grid-cols-12 gap-2'>
                            <div className='col-span-3 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center'>Airlines Standard Policy</div>
                            <div className='col-span-9 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 text-center'>In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.</div>
                        </div>

                        {/* Row 2 */}
                        <div className='grid grid-cols-12 gap-2'>
                            <div className='col-span-3 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center'>Flight/Hotel Cancellation</div>
                            <div className='col-span-9 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 text-center'>In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.</div>
                        </div>

                        {/* Row 3 */}
                        <div className='grid grid-cols-12 gap-2'>
                            <div className='col-span-3 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center'>Trip Insurance</div>
                            <div className='col-span-9 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 text-center'>In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.</div>
                        </div>

                        {/* Row 4 */}
                        <div className='grid grid-cols-12 gap-2'>
                            <div className='col-span-3 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center'>Hotel Check-In & Check Out</div>
                            <div className='col-span-9 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 text-center'>In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.</div>
                        </div>

                        {/* Row 5 - Last Row */}
                        <div className='grid grid-cols-12 gap-2'>
                            <div className='col-span-3 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center rounded-bl-lg rounded-br-lg'>Visa Rejection</div>
                            <div className='col-span-9 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 text-center rounded-bl-lg rounded-br-lg'>In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scope of Service */}
            <div className='bg-white rounded-lg border border-gray-200 p-6' style={{ pageBreakInside: 'avoid' }}>
                <h2 className='text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-500'>
                    Scope Of <span className='text-purple-800'>Service</span>
                </h2>

                {/* Table */}
                <div className='overflow-hidden rounded-lg'>
                    {/* Table Header */}
                    <div className='grid grid-cols-12 text-white gap-2'>
                        <div className='col-span-4 px-4 py-3 font-semibold bg-purple-900 text-sm border-r rounded-tr-lg rounded-tl-lg border-purple-700 text-center'>Service</div>
                        <div className='col-span-8 px-4 py-3 font-semibold bg-purple-900 text-sm rounded-tr-lg rounded-tl-lg text-center'>Details</div>
                    </div>

                    {/* Table Body */}
                    <div>
                        {/* Row 1 */}
                        <div className='grid grid-cols-12 gap-2'>
                            <div className='col-span-4 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center'>Flight Tickets And Hotel Vouchers</div>
                            <div className='col-span-8 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 text-center'>Delivered 3 Days Post Full Payment</div>
                        </div>

                        {/* Row 2 */}
                        <div className='grid grid-cols-12 gap-2'>
                            <div className='col-span-4 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center'>Web Check-In</div>
                            <div className='col-span-8 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 text-center'>Boarding Pass Delivery Via Email/WhatsApp</div>
                        </div>

                        {/* Row 3 */}
                        <div className='grid grid-cols-12 gap-2'>
                            <div className='col-span-4 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center'>Support</div>
                            <div className='col-span-8 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 text-center'>Chat Support — Response Time: 4 Hours</div>
                        </div>

                        {/* Row 4 */}
                        <div className='grid grid-cols-12 gap-2'>
                            <div className='col-span-4 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center'>Cancellation Support</div>
                            <div className='col-span-8 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 text-center'>Provided</div>
                        </div>

                        {/* Row 5 - Last Row */}
                        <div className='grid grid-cols-12 gap-2'>
                            <div className='col-span-4 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center rounded-bl-lg rounded-br-lg'>Trip Support</div>
                            <div className='col-span-8 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 text-center rounded-bl-lg rounded-br-lg'>Response Time: 5 Minutes</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inclusions Summary */}
            {inclusionsExclusions.inclusions.length > 0 && (
                <div className='bg-white rounded-lg border border-gray-200 p-6' style={{ pageBreakInside: 'avoid' }}>
                    <h2 className='text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-500'>
                        Inclusion <span className='text-purple-800'>Summary</span>
                    </h2>

                    {/* Table */}
                    <div className='overflow-hidden rounded-lg'>
                        {/* Table Header */}
                        <div className='grid grid-cols-12 text-white gap-2'>
                            <div className='col-span-2 px-4 py-3 font-semibold bg-purple-900 text-sm border-r rounded-tr-lg rounded-tl-lg border-purple-700 text-center'>Category</div>
                            <div className='col-span-1 py-3 font-semibold bg-purple-900 text-sm border-r rounded-tr-lg rounded-tl-lg border-purple-700 text-center'>Count</div>
                            <div className='col-span-5 px-4 py-3 font-semibold bg-purple-900 text-sm border-r rounded-tr-lg rounded-tl-lg border-purple-700 text-center'>Details</div>
                            <div className='col-span-4 px-4 py-3 font-semibold bg-purple-900 text-sm rounded-tr-lg rounded-tl-lg text-center'>Status / Comments</div>
                        </div>

                        {/* Table Body */}
                        <div>
                            {inclusionsExclusions.inclusions.map((inclusion, index) => (
                                <div key={inclusion.id} className='grid grid-cols-12 gap-2'>
                                    <div className={`col-span-2 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center ${index === inclusionsExclusions.inclusions.length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''}`}>
                                        {inclusion.category}
                                    </div>
                                    <div className={`col-span-1 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center ${index === inclusionsExclusions.inclusions.length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''}`}>
                                        {inclusion.count}
                                    </div>
                                    <div className={`col-span-5 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center ${index === inclusionsExclusions.inclusions.length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''}`}>
                                        {inclusion.details}
                                    </div>
                                    <div className={`col-span-4 px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 text-center ${index === inclusionsExclusions.inclusions.length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''}`}>
                                        {inclusion.statusComments}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Transfer Policy */}
                    {inclusionsExclusions.transferPolicy && (
                        <div className='mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200'>
                            <h3 className='text-md font-semibold text-gray-800 mb-2'>Transfer Policy (Refundable Upon Claim)</h3>
                            <p className='text-sm text-gray-700'>{inclusionsExclusions.transferPolicy}</p>
                        </div>
                    )}
                </div>
            )}
            {/* Activity Table */}
            {activitiesData.activities.length > 0 && activitiesData.activities.some(activity => activity.city || activity.activity) && (
                <div className='bg-white rounded-lg border border-gray-200 p-6' style={{ pageBreakInside: 'avoid' }}>
                    <h2 className='text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-500'>
                        Activity <span className='text-purple-800'>Table</span>
                    </h2>

                    {/* Table */}
                    <div className='overflow-hidden rounded-lg'>
                        {/* Table Header */}
                        <div className='grid grid-cols-4 text-white gap-2'>
                            <div className='px-4 py-3 font-semibold bg-purple-900 text-sm border-r rounded-tr-lg rounded-tl-lg border-purple-700 text-center'>City</div>
                            <div className='px-4 py-3 font-semibold bg-purple-900 text-sm border-r rounded-tr-lg rounded-tl-lg border-purple-700 text-center'>Activity</div>
                            <div className='px-4 py-3 font-semibold bg-purple-900 text-sm border-r rounded-tr-lg rounded-tl-lg border-purple-700 text-center'>Type</div>
                            <div className='px-4 py-3 font-semibold bg-purple-900 text-sm rounded-tr-lg rounded-tl-lg text-center'>Time Required</div>
                        </div>

                        {/* Table Body */}
                        <div>
                            {activitiesData.activities.filter(activity => activity.city || activity.activity).map((activity, index) => (
                                <div key={activity.id} className='grid grid-cols-4 gap-2'>
                                    <div className={`px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center ${index === activitiesData.activities.filter(a => a.city || a.activity).length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''}`}>
                                        {activity.city}
                                    </div>
                                    <div className={`px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center ${index === activitiesData.activities.filter(a => a.city || a.activity).length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''}`}>
                                        {activity.activity}
                                    </div>
                                    <div className={`px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 border-r border-gray-200 text-center ${index === activitiesData.activities.filter(a => a.city || a.activity).length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''}`}>
                                        {activity.type}
                                    </div>
                                    <div className={`px-4 py-3 text-sm bg-[#F9EEFF] p-2 text-gray-800 text-center ${index === activitiesData.activities.filter(a => a.city || a.activity).length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''}`}>
                                        {activity.timeRequired}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Terms and Conditions */}
            <div className='bg-white rounded-lg border border-gray-200 p-6' style={{ pageBreakBefore: 'always', pageBreakInside: 'avoid' }}>
                <h2 className='text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-500'>
                    Terms and <span className='text-purple-800'>Conditions</span>
                </h2>
                
                <div className='text-center'>
                    <a 
                        href="#" 
                        className='text-blue-600 hover:text-blue-800 underline text-sm font-medium'
                    >
                        View all terms and conditions
                    </a>
                </div>
            </div>

            {/* Payment Plan */}
            {paymentPlan.totalAmount > 0 && (
                <div className='bg-white rounded-lg border border-gray-200 p-6' style={{ pageBreakInside: 'avoid' }}>
                    <h2 className='text-2xl font-bold text-gray-800 mb-6 pb-2'>
                        Payment <span className='text-purple-800'>Plan</span>
                    </h2>

                    {/* Total Amount Row */}
                    <div className='mb-4 flex items-center border-2 border-purple-200 rounded-lg overflow-hidden'>
                        <div className='bg-purple-100 px-6 py-4 font-semibold text-gray-800 border-r-2 border-purple-200 flex items-center gap-2' style={{ minWidth: '200px' }}>
                            <span className='text-purple-600'>→</span>
                            Total Amount
                        </div>
                        <div className='flex-1 px-6 py-4 bg-white'>
                            <span className='font-bold text-gray-800'>{paymentPlan.currency} {paymentPlan.totalAmount.toLocaleString()}</span>
                            <span className='text-sm text-gray-600 ml-2'>For {paymentPlan.numberOfInstallments} Pax (Inclusive Of GST)</span>
                        </div>
                    </div>

                    {/* TCS Row */}
                    <div className='mb-6 flex items-center border-2 border-purple-200 rounded-lg overflow-hidden'>
                        <div className='bg-purple-100 px-6 py-4 font-semibold text-gray-800 border-r-2 border-purple-200 flex items-center gap-2' style={{ minWidth: '200px' }}>
                            <span className='text-purple-600'>→</span>
                            TCS
                        </div>
                        <div className='flex-1 px-6 py-4 bg-white'>
                            <span className='font-semibold text-gray-800'>{paymentPlan.tcsCollected ? 'Collected' : 'Not Collected'}</span>
                        </div>
                    </div>

                    {/* Installments Table */}
                    {paymentPlan.installments.length > 0 && (
                        <div className='overflow-hidden rounded-lg border border-gray-200'>
                            {/* Table Header */}
                            <div className='grid grid-cols-3 bg-purple-900 text-white'>
                                <div className='px-6 py-3 font-semibold text-sm text-center'>Installment</div>
                                <div className='px-6 py-3 font-semibold text-sm text-center'>Amount</div>
                                <div className='px-6 py-3 font-semibold text-sm text-center'>Due Date</div>
                            </div>
                            
                            {/* Table Body */}
                            <div>
                                {paymentPlan.installments.map((installment, index) => (
                                    <div key={installment.id} className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-purple-50' : 'bg-white'}`}>
                                        <div className='px-6 py-4 text-sm text-gray-800 text-center border-b border-gray-200'>
                                            {installment.description}
                                        </div>
                                        <div className='px-6 py-4 text-sm text-gray-800 text-center border-b border-gray-200'>
                                            {paymentPlan.currency}{installment.amount.toLocaleString()}
                                        </div>
                                        <div className='px-6 py-4 text-sm text-gray-800 text-center border-b border-gray-200'>
                                            {installment.dueDate || installment.description.includes('Initial') ? 'Initial Payment' : 
                                             installment.description.includes('Visa') ? 'Post Visa Approval' : 
                                             installment.description.includes('Remaining') ? '20 Days Before Departure' : 
                                             installment.dueDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Visa Details */}
            {flights.length > 0 && (
                <div className='bg-white rounded-lg border border-gray-200 p-6 mt-8' style={{ pageBreakInside: 'avoid' }}>
                    <h2 className='text-2xl font-bold text-gray-800 mb-6 pb-2'>
                        Visa <span className='text-purple-800'>Details</span>
                    </h2>

                    <div className='border-2 border-purple-600 rounded-2xl p-6 bg-white'>
                        <div className='grid grid-cols-3 gap-6'>
                            <div>
                                <p className='text-sm font-semibold text-gray-700 mb-1'>Visa Type :</p>
                                <p className='text-base text-gray-900'>{visaDetails.visaType || '123456'}</p>
                            </div>
                            <div>
                                <p className='text-sm font-semibold text-gray-700 mb-1'>Validity:</p>
                                <p className='text-base text-gray-900'>{visaDetails.validity || '123456'}</p>
                            </div>
                            <div>
                                <p className='text-sm font-semibold text-gray-700 mb-1'>Processing Date :</p>
                                <p className='text-base text-gray-900'>{visaDetails.processingDate || '123456'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
};

export default PDFContent;
