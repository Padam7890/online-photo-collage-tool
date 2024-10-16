
---

# **Online Photo Collage Tool**  
![License](https://img.shields.io/badge/license-MIT-green)  
![Status](https://img.shields.io/badge/status-In%20Development-orange)  

### **Description**  
The **Online Photo Collage Tool** allows users to create customized photo collages with multiple image uploads. This tool offers features like image resizing, rotating, and background customization, all powered by a backend built with **NestJS**. Users can generate their final collage and download it as a high-quality image (JPEG/PNG). 

---

## **Table of Contents**  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [API Endpoints](#api-endpoints)  
- [Usage](#usage)  
- [Development](#development)  
- [Contributing](#contributing)  
- [License](#license)  

---

## **Features**  
- **Upload Images**: Upload multiple images simultaneously.  
- **Collage Layouts**: Arrange images in predefined or freeform layouts.  
- **Customization Options**: Resize, rotate, and adjust photos.  
- **Background Choices**: Set colors, gradients, or image backgrounds.  
- **Image Export**: Download the collage in PNG/JPEG format.  
- **Optional Cloud Storage**: Store images using AWS S3 or Cloudinary.  

---

## **Tech Stack**  
- **Backend**: NestJS  
- **Image Processing**: Sharp  
- **File Uploads**: Multer  
- **Database**: PostgreSQL / MongoDB  
- **Frontend **: Next.js 

---

## **Installation**  

### **Prerequisites**  
- Node.js (v20.x or later)  
- PostgreSQL or MongoDB  

### **Clone the Repository**  
```bash
git clone https://github.com/Padam7890/online-photo-collage-tool.git
cd online-photo-collage-tool
```

### **Install Dependencies**  
```bash
npm install
```

### **Set Up Environment Variables**  
Create a `.env` file at the project root with the following values:  
```
PORT=3000
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-secret-key>
```

### **Run the Project**  
```bash
npm run start:dev
```

The server will run at **http://localhost:3001**. (backend server)
The server will run at **http://localhost:3000**. (Frontend )


---

## **API Endpoints**  

### **Upload Photos**  
`POST /upload/photos`  
- **Description**: Upload multiple images.
- **Request**: Form data with field `images[]`.  

### **Generate Collage**  
`POST /collage/generate`  
- **Description**: Merges uploaded images into a single collage.  
- **Request**: JSON body with an array of image paths:
  ```json
  {
    "images": ["uploads/image1.jpg", "uploads/image2.jpg"]
  }
  ```

---

## **Usage**  
1. Run the backend server using `npm run start:dev`.  
2. Use **Postman** or any API testing tool to upload images and generate collages.  
3. (Optional) Connect a frontend to interact with the backend via API.  

---

## **Development**  
🚧 **This project is currently in development** 🚧  
Some features are still under construction:
- Real-time image adjustments using **Socket.IO**.  
- User authentication and profile management.  
- Cloud storage for uploaded images (AWS S3 / Cloudinary).  
- Frontend integration with **React** or **Next.js**.

Feel free to fork the repository and contribute to its development!

---

## **Contributing**  
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.  
2. Create a feature branch: `git checkout -b feature-name`.  
3. Commit your changes: `git commit -m "Add some feature"`.  
4. Push to the branch: `git push origin feature-name`.  
5. Submit a pull request.  

---

## **License**  
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

## **Contact**  
For any inquiries or issues, feel free to open an issue on GitHub or contact the developer:  
**Padam Thapa**  
Kathmandu, Nepal  
