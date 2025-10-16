import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { 
  TourOverviewData, 
  DayItinerary, 
  Hotel, 
  PaymentPlanData, 
  InclusionsExclusionsData 
} from '../store/itineraryStore';

export interface ItineraryData {
  tourOverview: TourOverviewData;
  dailyItinerary: DayItinerary[];
  hotels: Hotel[];
  paymentPlan: PaymentPlanData;
  inclusionsExclusions: InclusionsExclusionsData;
}

export const generatePDF = async (data: ItineraryData): Promise<void> => {
  try {
    // Create a temporary container for the PDF content
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '800px';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.padding = '20px';
    tempContainer.style.fontFamily = 'Arial, sans-serif';
    
    // Generate HTML content
    const htmlContent = generateHTMLContent(data);
    tempContainer.innerHTML = htmlContent;
    
    document.body.appendChild(tempContainer);

    // Configure html2canvas options for better quality
    const canvas = await html2canvas(tempContainer, {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: tempContainer.scrollHeight,
      scrollX: 0,
      scrollY: 0,
    });

    // Remove temporary container
    document.body.removeChild(tempContainer);

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 20; // 10mm margin on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 10; // Top margin

    // Add first page
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight - 20; // Account for margins

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;
    }

    // Generate filename
    const filename = `${data.tourOverview.tripTitle || 'Itinerary'}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Save the PDF
    pdf.save(filename);

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

const generateHTMLContent = (data: ItineraryData): string => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount);
  };

  return `
    <div style="width: 100%; max-width: 800px; margin: 0 auto; background: white; color: black; font-family: Arial, sans-serif; line-height: 1.4;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 4px solid #2563eb; padding-bottom: 24px; margin-bottom: 32px;">
        <div style="display: flex; align-items: center;">
          <div style="margin-right: 16px;">
            <img src="/logo.png" alt="Vigovia Logo" style="height: 64px; width: 64px;" onerror="this.style.display='none';" />
          </div>
          <div>
            <h1 style="font-size: 24px; font-weight: bold; color: #2563eb; margin: 0;">VIGOVIA</h1>
            <p style="color: #666; margin: 0;">Travel & Tourism</p>
          </div>
        </div>
        <div style="text-align: right;">
          <p style="font-size: 12px; color: #666; margin: 0;">Tour Code: ${data.tourOverview.tourCode}</p>
          <p style="font-size: 12px; color: #666; margin: 0;">Generated: ${new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <!-- Title Section -->
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 32px; font-weight: bold; color: #374151; margin-bottom: 8px;">${data.tourOverview.tripTitle}</h1>
        <div style="display: flex; justify-content: center; gap: 32px; font-size: 16px; color: #666;">
          <span><strong>Duration:</strong> ${data.tourOverview.duration}</span>
          <span><strong>Travelers:</strong> ${data.tourOverview.numberOfTravellers}</span>
          <span><strong>Type:</strong> ${data.tourOverview.tourType}</span>
        </div>
      </div>

      <!-- Trip Overview -->
      <section style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #d1d5db; padding-bottom: 8px; margin-bottom: 24px;">TRIP OVERVIEW</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <div>
            <div style="margin-bottom: 16px;">
              <h3 style="font-weight: 600; color: #374151; margin-bottom: 4px;">Departure From</h3>
              <p style="color: #111827; margin: 0;">${data.tourOverview.departureFrom}</p>
            </div>
            <div style="margin-bottom: 16px;">
              <h3 style="font-weight: 600; color: #374151; margin-bottom: 4px;">Destination</h3>
              <p style="color: #111827; margin: 0;">${data.tourOverview.destination}</p>
            </div>
          </div>
          <div>
            <div style="margin-bottom: 16px;">
              <h3 style="font-weight: 600; color: #374151; margin-bottom: 4px;">Departure Date</h3>
              <p style="color: #111827; margin: 0;">${formatDate(data.tourOverview.departureDate)}</p>
            </div>
            <div style="margin-bottom: 16px;">
              <h3 style="font-weight: 600; color: #374151; margin-bottom: 4px;">Return Date</h3>
              <p style="color: #111827; margin: 0;">${formatDate(data.tourOverview.arrivalDate)}</p>
            </div>
          </div>
        </div>
        
        ${data.tourOverview.highlights && data.tourOverview.highlights.length > 0 && data.tourOverview.highlights.some(h => h) ? `
          <div style="margin-top: 24px;">
            <h3 style="font-weight: 600; color: #374151; margin-bottom: 12px;">Tour Highlights</h3>
            <ul style="margin: 0; padding-left: 20px;">
              ${data.tourOverview.highlights.filter(h => h).map(highlight => `<li style="color: #111827; margin-bottom: 4px;">${highlight}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </section>

      <!-- Daily Itinerary -->
      <section style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #d1d5db; padding-bottom: 8px; margin-bottom: 24px;">DAILY ITINERARY</h2>
        ${data.dailyItinerary.map(day => `
          <div style="margin-bottom: 32px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 18px; font-weight: bold; color: #374151; margin: 0;">Day ${day.dayNumber}</h3>
              <div style="text-align: right;">
                <p style="color: #666; margin: 0;">${formatDate(day.date)}</p>
                <p style="color: #111827; font-weight: 600; margin: 0;">${day.city}</p>
              </div>
            </div>

            ${day.activities && day.activities.length > 0 ? `
              <div style="margin-bottom: 16px;">
                <h4 style="font-weight: 600; color: #374151; margin-bottom: 8px;">Activities</h4>
                ${day.activities.map(activity => `
                  <div style="margin-bottom: 12px; padding-left: 16px; border-left: 2px solid #bfdbfe;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 4px;">
                      <h5 style="font-weight: 500; color: #111827; margin: 0;">${activity.title}</h5>
                      <span style="font-size: 12px; background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px;">
                        ${activity.time} - ${activity.type}
                      </span>
                    </div>
                    ${activity.description ? `<p style="color: #666; font-size: 14px; margin: 4px 0;">${activity.description}</p>` : ''}
                    ${activity.location ? `<p style="color: #9ca3af; font-size: 14px; margin: 0;">📍 ${activity.location}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${day.transportation && day.transportation.length > 0 ? `
              <div style="margin-bottom: 16px;">
                <h4 style="font-weight: 600; color: #374151; margin-bottom: 8px;">Transportation</h4>
                ${day.transportation.map(transport => `
                  <div style="margin-bottom: 8px; font-size: 14px;">
                    <span style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px; margin-right: 8px;">
                      ${transport.type}
                    </span>
                    <span>${transport.from} → ${transport.to}</span>
                    <span style="color: #9ca3af; margin-left: 8px;">${transport.time}</span>
                    ${transport.details ? `<p style="color: #666; margin: 4px 0 0 8px;">${transport.details}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              ${day.meals.breakfast ? `
                <div>
                  <h5 style="font-weight: 500; color: #374151; margin: 0;">🍽️ Breakfast</h5>
                  <p style="font-size: 14px; color: #111827; margin: 0;">${day.meals.breakfast}</p>
                </div>
              ` : ''}
              ${day.meals.lunch ? `
                <div>
                  <h5 style="font-weight: 500; color: #374151; margin: 0;">🥗 Lunch</h5>
                  <p style="font-size: 14px; color: #111827; margin: 0;">${day.meals.lunch}</p>
                </div>
              ` : ''}
              ${day.meals.dinner ? `
                <div>
                  <h5 style="font-weight: 500; color: #374151; margin: 0;">🍽️ Dinner</h5>
                  <p style="font-size: 14px; color: #111827; margin: 0;">${day.meals.dinner}</p>
                </div>
              ` : ''}
            </div>

            ${day.accommodation ? `
              <div>
                <h5 style="font-weight: 500; color: #374151; margin: 0;">🏨 Accommodation</h5>
                <p style="font-size: 14px; color: #111827; margin: 0;">${day.accommodation}</p>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </section>

      <!-- Hotel Details -->
      ${data.hotels && data.hotels.length > 0 && data.hotels.some(h => h.name) ? `
        <section style="margin-bottom: 40px;">
          <h2 style="font-size: 20px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #d1d5db; padding-bottom: 8px; margin-bottom: 24px;">HOTEL DETAILS</h2>
          ${data.hotels.filter(hotel => hotel.name).map(hotel => `
            <div style="margin-bottom: 24px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
                <div>
                  <h3 style="font-size: 18px; font-weight: bold; color: #374151; margin: 0;">${hotel.name}</h3>
                  <p style="color: #666; margin: 0;">${hotel.address}, ${hotel.city}</p>
                  <div style="display: flex; align-items: center; margin-top: 8px;">
                    <span style="color: #fbbf24;">★★★★★</span>
                    <span style="margin-left: 8px; font-size: 14px; color: #666;">(${hotel.rating} Star)</span>
                  </div>
                </div>
                <div style="text-align: right;">
                  <p style="font-size: 14px; color: #666; margin: 0;">Check-in: ${formatDate(hotel.checkInDate)}</p>
                  <p style="font-size: 14px; color: #666; margin: 0;">Check-out: ${formatDate(hotel.checkOutDate)}</p>
                  <p style="font-weight: 600; margin: 0;">${hotel.numberOfNights} nights</p>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div>
                  <h4 style="font-weight: 600; color: #374151; margin: 0 0 8px 0;">Room Details</h4>
                  <p style="font-size: 14px; margin: 0;">Type: ${hotel.roomType}</p>
                  <p style="font-size: 14px; margin: 0;">Rooms: ${hotel.numberOfRooms}</p>
                  ${hotel.pricePerNight > 0 ? `<p style="font-size: 14px; margin: 0;">Rate: ${formatCurrency(hotel.pricePerNight, hotel.currency)}/night</p>` : ''}
                </div>
                <div>
                  <h4 style="font-weight: 600; color: #374151; margin: 0 0 8px 0;">Contact</h4>
                  ${hotel.contactNumber ? `<p style="font-size: 14px; margin: 0;">📞 ${hotel.contactNumber}</p>` : ''}
                  ${hotel.email ? `<p style="font-size: 14px; margin: 0;">📧 ${hotel.email}</p>` : ''}
                  ${hotel.bookingReference ? `<p style="font-size: 14px; margin: 0;">Ref: ${hotel.bookingReference}</p>` : ''}
                </div>
              </div>

              ${hotel.amenities && hotel.amenities.length > 0 ? `
                <div style="margin-bottom: 16px;">
                  <h4 style="font-weight: 600; color: #374151; margin: 0 0 8px 0;">Amenities</h4>
                  <div>
                    ${hotel.amenities.map(amenity => `<span style="background: #eff6ff; color: #1d4ed8; padding: 4px 12px; border-radius: 16px; font-size: 14px; margin-right: 8px; margin-bottom: 4px; display: inline-block;">${amenity}</span>`).join('')}
                  </div>
                </div>
              ` : ''}

              ${hotel.notes ? `
                <div>
                  <h4 style="font-weight: 600; color: #374151; margin: 0 0 4px 0;">Notes</h4>
                  <p style="font-size: 14px; color: #666; margin: 0;">${hotel.notes}</p>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </section>
      ` : ''}

      <!-- Inclusions & Exclusions -->
      <section style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #d1d5db; padding-bottom: 8px; margin-bottom: 24px;">INCLUSIONS & EXCLUSIONS</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
          <div>
            <h3 style="font-size: 18px; font-weight: 600; color: #059669; margin-bottom: 16px;">✅ INCLUSIONS</h3>
            ${data.inclusionsExclusions.inclusions && data.inclusionsExclusions.inclusions.some(i => i.details) ? `
              <ul style="margin: 0; padding: 0; list-style: none;">
                ${data.inclusionsExclusions.inclusions.filter(i => i.details).map(inclusion => `
                  <li style="display: flex; align-items: start; margin-bottom: 8px;">
                    <span style="color: #10b981; margin-right: 8px; margin-top: 4px;">✓</span>
                    <div>
                      ${inclusion.category ? `<span style="font-weight: 500; color: #374151;">${inclusion.category}: </span>` : ''}
                      <span style="color: #111827;">${inclusion.details}</span>
                    </div>
                  </li>
                `).join('')}
              </ul>
            ` : '<p style="color: #9ca3af; font-style: italic;">No inclusions specified</p>'}
          </div>

          <div>
            <h3 style="font-size: 18px; font-weight: 600; color: #dc2626; margin-bottom: 16px;">❌ EXCLUSIONS</h3>
            ${data.inclusionsExclusions.exclusions && data.inclusionsExclusions.exclusions.some(e => e.details) ? `
              <ul style="margin: 0; padding: 0; list-style: none;">
                ${data.inclusionsExclusions.exclusions.filter(e => e.details).map(exclusion => `
                  <li style="display: flex; align-items: start; margin-bottom: 8px;">
                    <span style="color: #ef4444; margin-right: 8px; margin-top: 4px;">✗</span>
                    <div>
                      ${exclusion.category ? `<span style="font-weight: 500; color: #374151;">${exclusion.category}: </span>` : ''}
                      <span style="color: #111827;">${exclusion.details}</span>
                    </div>
                  </li>
                `).join('')}
              </ul>
            ` : '<p style="color: #9ca3af; font-style: italic;">No exclusions specified</p>'}
          </div>
        </div>

        ${data.inclusionsExclusions.importantNotes && data.inclusionsExclusions.importantNotes.length > 0 ? `
          <div style="margin-top: 32px;">
            <h3 style="font-size: 18px; font-weight: 600; color: #d97706; margin-bottom: 16px;">⚠️ IMPORTANT NOTES</h3>
            <div style="space-y: 12px;">
              ${data.inclusionsExclusions.importantNotes.map(note => `
                <div style="padding: 16px; border-radius: 8px; border-left: 4px solid ${note.type === 'warning' ? '#f59e0b' : note.type === 'important' ? '#ef4444' : '#3b82f6'}; background-color: ${note.type === 'warning' ? '#fef3c7' : note.type === 'important' ? '#fee2e2' : '#dbeafe'}; margin-bottom: 12px;">
                  <h4 style="font-weight: 600; color: #374151; margin: 0 0 4px 0;">${note.title}</h4>
                  <p style="color: #374151; font-size: 14px; margin: 0;">${note.description}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </section>

      <!-- Payment Plan -->
      ${data.paymentPlan.totalAmount > 0 ? `
        <section style="margin-bottom: 40px;">
          <h2 style="font-size: 20px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #d1d5db; padding-bottom: 8px; margin-bottom: 24px;">PAYMENT PLAN</h2>
          
          <div style="background: #eff6ff; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; text-align: center;">
              <div>
                <h3 style="font-size: 20px; font-weight: bold; color: #2563eb; margin: 0;">
                  ${formatCurrency(data.paymentPlan.totalAmount, data.paymentPlan.currency)}
                </h3>
                <p style="color: #666; margin: 0;">Total Amount</p>
              </div>
              <div>
                <h3 style="font-size: 20px; font-weight: bold; color: #2563eb; margin: 0;">${data.paymentPlan.numberOfInstallments}</h3>
                <p style="color: #666; margin: 0;">Installments</p>
              </div>
              <div>
                <h3 style="font-size: 20px; font-weight: bold; color: #2563eb; margin: 0;">
                  ${data.paymentPlan.installments.length > 0 ? 
                    formatCurrency(data.paymentPlan.totalAmount / data.paymentPlan.numberOfInstallments, data.paymentPlan.currency) : 
                    formatCurrency(0, data.paymentPlan.currency)
                  }
                </h3>
                <p style="color: #666; margin: 0;">Avg. Installment</p>
              </div>
            </div>
          </div>

          ${data.paymentPlan.installments && data.paymentPlan.installments.length > 0 ? `
            <div style="margin-bottom: 24px;">
              <h3 style="font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 12px;">Payment Schedule</h3>
              <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background: #f9fafb;">
                    <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Installment</th>
                    <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Due Date</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Amount</th>
                    <th style="padding: 12px; text-align: center; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${data.paymentPlan.installments.map((installment, index) => `
                    <tr style="background: ${index % 2 === 0 ? 'white' : '#f9fafb'};">
                      <td style="padding: 12px; color: #111827;">${installment.description}</td>
                      <td style="padding: 12px; color: #111827;">${formatDate(installment.dueDate)}</td>
                      <td style="padding: 12px; text-align: right; font-weight: 600; color: #111827;">
                        ${formatCurrency(installment.amount, data.paymentPlan.currency)}
                      </td>
                      <td style="padding: 12px; text-align: center;">
                        <span style="padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: 600; ${
                          installment.status === 'Paid' ? 'background: #dcfce7; color: #166534;' :
                          installment.status === 'Overdue' ? 'background: #fee2e2; color: #991b1b;' :
                          'background: #fef3c7; color: #92400e;'
                        }">
                          ${installment.status}
                        </span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}

          ${data.paymentPlan.additionalFees && data.paymentPlan.additionalFees.length > 0 ? `
            <div style="margin-bottom: 24px;">
              <h3 style="font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 12px;">Additional Fees</h3>
              <div>
                ${data.paymentPlan.additionalFees.map(fee => `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f9fafb; border-radius: 4px; margin-bottom: 8px;">
                    <div>
                      <span style="font-weight: 500; color: #111827;">${fee.name}</span>
                      ${fee.description ? `<p style="font-size: 14px; color: #666; margin: 0;">${fee.description}</p>` : ''}
                    </div>
                    <span style="font-weight: 600; color: #111827;">
                      ${formatCurrency(fee.amount, data.paymentPlan.currency)}
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; font-size: 14px;">
            ${data.paymentPlan.paymentTerms ? `
              <div>
                <h4 style="font-weight: 600; color: #374151; margin: 0 0 8px 0;">Payment Terms</h4>
                <p style="color: #666; margin: 0;">${data.paymentPlan.paymentTerms}</p>
              </div>
            ` : ''}
            ${data.paymentPlan.refundPolicy ? `
              <div>
                <h4 style="font-weight: 600; color: #374151; margin: 0 0 8px 0;">Refund Policy</h4>
                <p style="color: #666; margin: 0;">${data.paymentPlan.refundPolicy}</p>
              </div>
            ` : ''}
          </div>
        </section>
      ` : ''}

      <!-- Footer -->
      <footer style="border-top: 2px solid #2563eb; padding-top: 24px; margin-top: 40px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
          <div>
            <h3 style="font-weight: bold; color: #374151; margin: 0 0 8px 0;">VIGOVIA Travel & Tourism</h3>
            <p style="font-size: 14px; color: #666; margin: 0 0 4px 0;">Creating Unforgettable Travel Experiences</p>
            <p style="font-size: 14px; color: #666; margin: 0 0 4px 0;">📧 info@vigovia.com</p>
            <p style="font-size: 14px; color: #666; margin: 0;">📞 +1 (555) 123-4567</p>
          </div>
          <div style="text-align: right;">
            <p style="font-size: 14px; color: #666; margin: 0 0 4px 0;">Generated on: ${new Date().toLocaleString()}</p>
            <p style="font-size: 14px; color: #666; margin: 0 0 8px 0;">Document ID: ${data.tourOverview.tourCode || 'VGV-' + Date.now()}</p>
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">
              This itinerary is subject to change based on availability and weather conditions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  `;
};
