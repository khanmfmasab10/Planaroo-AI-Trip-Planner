import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure your VITE_GOOGLE_GEMINI_AI_API_KEY is correctly set in your .env file
// and accessible by your build tool (e.g., Vite)
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Initialize the generative model
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // Using the model specified in your code
});

// Configure generation parameters
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64, // Corrected from topk to topK
    maxOutputTokens: 8192, // Corrected from max0utputTokens to maxOutputTokens
    responseMimeType: "application/json", // Expecting JSON response
};

// Start a chat session with predefined history for few-shot prompting
export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in STRICT JSON format only, no extra text or commentary. Ensure valid JSON with properly closed strings and arrays." },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: `{
  "Location": "Las Vegas, Nevada, USA",
  "Duration": "3 Days",
  "Target Audience": "Couple",
  "Budget": "Cheap",
  "Currency": "INR / USD (Note: Hotel prices are in INR as returned by the search tool, approximate USD conversion will vary)",
  "Hotels": [
    {
      "HotelName": "Silver Sevens Hotel & Casino",
      "Hotel_address": "Not Available via API (Located near McCarran International Airport/East Strip)",
      "Price": "₹1,149 per night (₹3,447 for 3 nights)",
      "Currency": "INR",
      "Hotel_image_url": "Search 'Silver Sevens Hotel & Casino' for image link",
      "Geo_coordinates": "Not Available via API",
      "Rating": 3.6,
      "Description": "Casual casino hotel featuring low-key rooms, plus a free airport shuttle, 2 restaurants & a bar. Best for a very cheap stay slightly off the main Strip."
    },
    {
      "HotelName": "Rio Hotel & Casino",
      "Hotel_address": "Not Available via API (Located West of the Strip, near I-15)",
      "Price": "₹1,149 per night (₹3,447 for 3 nights)",
      "Currency": "INR",
      "Hotel_image_url": "Search 'Rio Hotel & Casino' for image link",
      "Geo_coordinates": "Not Available via API",
      "Rating": 3.8,
      "Description": "Warm suites & plush villas in a vibrant property offering live shows, restaurants & 4 outdoor pools. Requires a short bus/taxi ride to the main Strip."
    },
    {
      "HotelName": "Bposhtels Las Vegas",
      "Hotel_address": "Not Available via API (Hostel/Budget Hotel)",
      "Price": "₹3,848 per night (₹11,543 for 3 nights)",
      "Currency": "INR",
      "Hotel_image_url": "Search 'Bposhtels Las Vegas' for image link",
      "Geo_coordinates": "Not Available via API",
      "Rating": 3.6,
      "Description": "Funky dorms with TVs & coffeemakers in a trendy hostel offering an outdoor pool & a cocktail bar. A budget option with a social atmosphere."
    },
    {
      "HotelName": "Circus Circus Hotel and Casino",
      "Hotel_address": "Not Available via API (North Strip)",
      "Price": "₹4,387 per night (₹13,161 for 3 nights)",
      "Currency": "INR",
      "Hotel_image_url": "Search 'Circus Circus Hotel and Casino' for image link",
      "Geo_coordinates": "Not Available via API",
      "Rating": 3.8,
      "Description": "Vibrant casino hotel with dining & complimentary circus acts, plus a theme park & 2 outdoor pools. A classic, budget-friendly option directly on the Strip."
    },
    {
      "HotelName": "Golden Gate Hotel & Casino",
      "Hotel_address": "Not Available via API (Downtown Las Vegas/Fremont Street)",
      "Price": "₹4,387 per night (₹13,161 for 3 nights)",
      "Currency": "INR",
      "Hotel_image_url": "Search 'Golden Gate Hotel & Casino' for image link",
      "Geo_coordinates": "Not Available via API",
      "Rating": 4.1,
      "Description": "Glam 1906 casino hotel featuring three bars & American dining. Located in Downtown on Fremont Street, offering a different, historic Las Vegas experience."
    }
  ],
  "Itinerary": [
    {
      "Day": 1,
      "Theme": "Classic Las Vegas Strip Walk (Free Attractions)",
      "Plan": [
        {
          "PlaceName": "Welcome to Fabulous Las Vegas Sign",
          "PlaceDetails": "A classic photo opportunity at the south end of the Strip. A must-see landmark.",
          "Place_Image_Url": "Placeholder: 'Search for Welcome to Fabulous Las Vegas Sign image'",
          "Geo_Coordinates": "36.0820° N, 115.1729° W",
          "Ticket_Pricing": "Free",
          "Time_to_travel": "10-20 min via bus/rideshare to the location, then 30 min for visit",
          "Best_Time_to_Visit": "Morning (around 9:00 AM) to avoid midday heat and long photo lines."
        },
        {
          "PlaceName": "Bellagio Conservatory & Botanical Gardens",
          "PlaceDetails": "Stunning, massive indoor floral displays that change seasonally. A free, air-conditioned attraction.",
          "Place_Image_Url": "Placeholder: 'Search for Bellagio Conservatory image'",
          "Geo_Coordinates": "36.1132° N, 115.1764° W",
          "Ticket_Pricing": "Free",
          "Time_to_travel": "15-25 min walk along the Strip",
          "Best_Time_to_Visit": "Mid-day (1:00 PM - 4:00 PM) for a cool, relaxing indoor break."
        },
        {
          "PlaceName": "Fountains of Bellagio Show",
          "PlaceDetails": "The famous synchronized water, music, and light show. Shows run every 15-30 minutes.",
          "Place_Image_Url": "Placeholder: 'Search for Fountains of Bellagio image'",
          "Geo_Coordinates": "36.1126° N, 115.1760° W",
          "Ticket_Pricing": "Free",
          "Time_to_travel": "Right outside the Bellagio",
          "Best_Time_to_Visit": "After sunset (7:00 PM - 9:00 PM) for the best visual experience with the lights."
        }
      ]
    },
    {
      "Day": 2,
      "Theme": "Grandeur, Art, and Downtown Charm",
      "Plan": [
        {
          "PlaceName": "The Venetian/Palazzo Walk",
          "PlaceDetails": "Walk through the Grand Canal Shoppes, admire the Venice-themed architecture, and listen to the street performers/singing gondoliers (without paying for the ride).",
          "Place_Image_Url": "Placeholder: 'Search for Venetian Las Vegas Grand Canal Shoppes image'",
          "Geo_Coordinates": "36.1211° N, 115.1685° W",
          "Ticket_Pricing": "Free (Walking/Viewing)",
          "Time_to_travel": "30-45 min walk or short bus/Monorail ride from central Strip",
          "Best_Time_to_Visit": "Morning (10:00 AM - 12:00 PM) before peak foot traffic."
        },
        {
          "PlaceName": "Aria Fine Art Collection",
          "PlaceDetails": "A free, self-guided tour of public art installations located throughout the Aria campus and CityCenter. Look for pieces by famous modern artists.",
          "Place_Image_Url": "Placeholder: 'Search for Aria Fine Art Collection image'",
          "Geo_Coordinates": "36.1077° N, 115.1767° W",
          "Ticket_Pricing": "Free",
          "Time_to_travel": "15-20 min walk from Bellagio/Cosmopolitan area",
          "Best_Time_to_Visit": "Mid-day (2:00 PM - 4:00 PM) for a quiet, culture-focused break."
        },
        {
          "PlaceName": "Fremont Street Experience (Downtown)",
          "PlaceDetails": "A massive pedestrian mall in Downtown Las Vegas with a vaulted canopy that puts on a free light and music show (Viva Vision). Features cheap eats and live music.",
          "Place_Image_Url": "Placeholder: 'Search for Fremont Street Experience image'",
          "Geo_Coordinates": "36.1691° N, 115.1437° W",
          "Ticket_Pricing": "Free (for viewing Viva Vision and street acts)",
          "Time_to_travel": "20-30 min bus/rideshare from the Strip",
          "Best_Time_to_Visit": "After 6:00 PM (when it gets dark) for the light show and street atmosphere."
        }
      ]
    },
    {
      "Day": 3,
      "Theme": "Retro Games and Desert Art",
      "Plan": [
        {
          "PlaceName": "Pinball Hall of Fame",
          "PlaceDetails": "A non-profit museum featuring thousands of working pinball and arcade machines. Free entry; pay only for the games you choose to play (average 25¢ - $1 per game).",
          "Place_Image_Url": "Placeholder: 'Search for Pinball Hall of Fame Las Vegas image'",
          "Geo_Coordinates": "36.0967° N, 115.1751° W",
          "Ticket_Pricing": "Free entry (Budget ~$10 USD for games)",
          "Time_to_travel": "10-15 min bus/rideshare (near Mandalay Bay)",
          "Best_Time_to_Visit": "Opening time (11:00 AM) for less crowd and full machine selection."
        },
        {
          "PlaceName": "Seven Magic Mountains",
          "PlaceDetails": "A large-scale, colorful public art installation of stacked, painted boulders in the desert, about 10 miles south of the Strip. Excellent for photos.",
          "Place_Image_Url": "Placeholder: 'Search for Seven Magic Mountains image'",
          "Geo_Coordinates": "35.8810° N, 115.2676° W",
          "Ticket_Pricing": "Free (Requires a rideshare or rental car for transit)",
          "Time_to_travel": "30-45 min drive/ride (each way)",
          "Best_Time_to_Visit": "Late afternoon (4:00 PM - 6:00 PM) for dramatic lighting and cooler temperatures."
        },
        {
          "PlaceName": "The LINQ Promenade Walk",
          "PlaceDetails": "A vibrant open-air district with shops and restaurants located on the central Strip. Walk the area and enjoy the street performances and the glow of the High Roller wheel.",
          "Place_Image_Url": "Placeholder: 'Search for LINQ Promenade image'",
          "Geo_Coordinates": "36.1167° N, 115.1718° W",
          "Ticket_Pricing": "Free (Walking/Viewing)",
          "Time_to_travel": "Central Strip, easily walkable",
          "Best_Time_to_Visit": "Evening (6:00 PM onwards) for a final night stroll and atmosphere."
        }
      ]
    }
  ]
}`,
                },
            ],
        },
    ],
});

// Async function to run the chat interaction
async function run() {
    try {
        // Send a follow-up message (or the actual prompt if not using few-shot)
        // Since you've provided a few-shot example, the model might respond based on that.
        // For a true "few-shot" demonstration, your next message would be a similar request
        // but for a different location/duration, expecting the model to follow the format.
        // For this example, let's assume a simple follow-up or a new query.
        const result = await chatSession.sendMessage("Could you suggest a few more budget-friendly dining options for Las Vegas?");

        const responseText = result.response.text();
        console.log("Model's response:\n", responseText);

        // If the responseMimeType is set to "application/json", the model should
        // ideally return a valid JSON string. You might need to parse it.
        try {
            const parsedResponse = JSON.parse(responseText);
            console.log("\nParsed JSON response:\n", parsedResponse);
        } catch (jsonError) {
            console.error("Failed to parse JSON response:", jsonError);
            console.log("Raw response (not valid JSON for parsing):", responseText);
        }

    } catch (error) {
        console.error("Error during chat session:", error);
    }
}

// Call the run function to execute the chat interaction
run();