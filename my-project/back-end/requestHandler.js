
import userSchema from "./models/user.model.js"
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import studentsSchema from './models/students.model.js'
import staffSchema from './models/staff.model.js'
import Mark from './models/marks.model.js'





const {sign} = pkg

// Authentication


export async function userRegister(req,res) {

  const {name,username,phone,password,cpassword,email,role,photo}=req.body

  if(!(name&&username&&phone&&password&&cpassword&&email&&role&&photo))
      return res.status(404).send("fields are empty")

  if(password!==cpassword)
      return res.status(404).send("password not matched")

bcrypt.hash(password,10).then(async(hpassword)=>{
  userSchema.create({name,username,phone,password:hpassword,email,role,otp:"",photo}).then(()=>{
      return res.status(201).send({msg:"successfully created"})

  })
  .catch((error)=>{
      return res.status(400).send({error:error})
  })
}).catch((error)=>{
  res.status(400).send({error:error})
})
  
}



export async function Login(req, res) {
  try {
         const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).json({
              msg: "Email or password cannot be empty!"
          });
      }

          const user = await userSchema.findOne({ email });
      if (!user) {
          return res.status(400).json({
              msg: "Invalid email or password!"
          });
      }

          const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
                  const token = pkg.sign({
              email: user.email,
              userId: user._id,
              role: user.role 
          }, process.env.JWT_KEY, {
              expiresIn: "48h"
          });
          return res.status(200).json({
              msg: "Login successful!",
              token,
              role: user.role
          });
      }

           return res.status(400).json({
          msg: "Invalid email or password!"
      });
  } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
          msg: "An error occurred during login.",
          error: error.message
      });
  }
}







export async function Logout(req, res) {
  try {
 
    req.session = null; 
    res.status(200).send({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}


const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "b61b6c0d2da033",
    pass: "eadc5f952d3437",
  },
});

export async function forget(req, res) {
  const { email } = req.body;
  console.log("Received email:", email);

  try {
    const data = await userSchema.findOne({ email: email });
    if (!data) {
      return res.status(400).send({ msg: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("Generated OTP:", otp);
    data.otp = otp;
    await data.save();
    if (!transporter) {
      console.error("Email transporter is not configured properly.");
      return res.status(500).send({ msg: "Email configuration error" });
    }
    const info = await transporter.sendMail({
      from: 'peterspidy5@gmail.com',
      to: data.email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
      html: `<b>Your OTP is ${otp}</b>`,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).send({ msg: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in adminForget function:", error.message || error);
    res.status(500).send({ msg: "An error occurred while processing your request" });
  }
}


  

export async function resetPassword(req, res) {
  const { email, otp, newPassword } = req.body;
  console.log("Received reset request:", email, otp);

  try {
       const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ msg: "User not found" });
    }
    if (user.otp !== otp) {
      return res.status(400).send({ msg: "Invalid OTP" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        user.password = hashedPassword;
    user.otp = null; 
    await user.save();
    res.status(200).send({ msg: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword function:", error.message || error);
    res.status(500).send({ msg: "An error occurred while resetting your password" });
  }
}




export async function Home(req, res) {
  try {
        const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: 'Unauthorized access. No token provided.' });
    }
      const decoded = pkg.verify(token, process.env.JWT_KEY);
    const { userId, email, role } = decoded;

    const user = await userSchema.findOne({ _id: userId }, { password: 0 });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const { username, photo } = user;

    return res.status(200).json({
      msg: 'User profile found',
      user: {
        email,
        username,
        photo,
        role,
        token
      }
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({
      msg: 'An error occurred!',
      error: error.message
    });
  }
}







export async function addStudents(req,res){
  try{
      console.log(req.body);
      const {...FormData} = req.body;

      await studentsSchema
      .create({...FormData})
          .then(()=>{
              res.status(200).send({msg:"sucessfully created"})
          })
          .catch((error)=>{
              res.status(400).send({error:error})
          });
  }catch(error){
      res.status(500).send(error)
  }
}


export async function getStudents(req,res){
  try{

      const data=await studentsSchema.find();
      res.status(200).send(data)
      console.log(data);
  }catch (error){
      res.status(500).send(error)
  }
}


export async function getStudentsOne(req,res){
  try {
    const username = req.query.username; 
    const student = await studentsSchema.findOne({ name: username }).lean();

    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    res.status(200).send(student);
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).send({ error: "Server error" });
  }
}

export async function getStudentEdit(req,res) {
  try {
      const {id}=req.params;
      console.log(id);
      const data = await studentsSchema.findOne({_id:id})
      console.log(data);
      res.status(200).send(data)
  } catch (error) {
      res.status(400).send(error)
  }
}

export async function deleteStudent(req, res) {
  try {
      const { id } = req.params;
      console.log(id);    

    await studentsSchema.deleteOne({_id:id});
     res.status(200).send({msg:"successfully deleted"})
  } catch (error) {
      console.error(error);
      res.status(400).send({ error});
  }
  
}




export async function updateStudent(req,res) {
  try {
      const {id}=req.params;
      console.log(id);
  const {...FormData}=req.body
  await studentsSchema.updateOne({_id:id},{$set:{...FormData}})
      res.status(201).send({msg:"updated"})
  } catch (error) {
      res.status(400).send(error)
  }
}

// staff
export async function addStaff(req,res){
  try{
      console.log(req.body);
      const {...FormData} = req.body;

      await staffSchema
      .create({...FormData})
          .then(()=>{
              res.status(200).send({msg:"sucessfully created"})
          })
          .catch((error)=>{
              res.status(400).send({error:error})
          });
  }catch(error){
      res.status(500).send(error)
  }
}



export async function getStaff(req,res){
  try{

      const data=await staffSchema.find();
      res.status(200).send(data)
      console.log(data);
  }catch (error){
      res.status(500).send(error)
  }
}


export async function getStaffEdit(req,res) {
  try {
      const {id}=req.params;
      console.log(id);
      const data = await staffSchema.findOne({_id:id})
      console.log(data);
      res.status(200).send(data)
  } catch (error) {
      res.status(400).send(error)
  }
}

export async function getStaffOne(req,res){
  try {
    const username = req.query.username;
    const staff = await staffSchema.findOne({ name: username }).lean();

    if (!staff) {
      return res.status(404).send({ message: "Staff not found" });
    }

    res.status(200).send(staff);
  } catch (error) {
    console.error("Error fetching staff data:", error);
    res.status(500).send({ error: "Server error" });
  }
}

export async function deleteStaff(req, res) {
  try {
      const { id } = req.params;
      console.log(id);    

    await staffSchema.deleteOne({_id:id});
     res.status(200).send({msg:"successfully deleted"})
  } catch (error) {
      console.error(error);
      res.status(400).send({ error});
  }
  
}




export async function updateStaff(req,res) {
  try {
      const {id}=req.params;
      console.log(id);
  const {...FormData}=req.body
  await staffSchema.updateOne({_id:id},{$set:{...FormData}})
      res.status(201).send({msg:"updated"})
  } catch (error) {
      res.status(400).send(error)
  }
}



// marks



export async function addMarks(req, res) {
  try {
      const { semester, studentid, subject } = req.body;
    
    if (!subject || !subject.name || !subject.mark) {
      return res.status(400).json({ message: 'Subject name and mark are required.' });
    }
    let markRecord = await Mark.findOne({ semester, studentid });

    if (markRecord) {
          markRecord.subjects.push(subject);
    } else {
         markRecord = new Mark({
        semester,
        studentid,
        subjects: [subject],
      });
    }
    await markRecord.save();
    res.status(201).json({ message: 'Subject added successfully', data: markRecord });
  } catch (error) {
    console.error('Error adding subject:', error);
    res.status(500).json({ message: 'An error occurred while adding the subject', error: error.message });
  }
}


export async function getMarkEdit(req, res) {
  const { studentid } = req.params;

  try {
       const data = await Mark.find({ studentid });

      if (data.length === 0) {
      return res.status(404).send("No marks found for the given student ID.");
    }
    res.status(200).send(data);
  } catch (error) {
    console.error("Error fetching marks for student:", error);
    return res.status(500).send("Error occurred while getting marks.");
  }
}

export async function getMarklist(req,res){
  try {
    const data=await Mark.find({}).then((data)=>{
      return res.status(200).send(data)
    })
  } catch (error) {
    return res.status(500).send("internal  errror in viewing Marklist")
  }
}





// Count



export async function studentsCount(req, res) {
  try {
    const studentCount = await studentsSchema.countDocuments({});
      res.status(200).json({ count: studentCount });
  } catch (error) {
    console.error('Error fetching student count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


export async function staffCount(req, res) {
  try {
    const staffCount = await staffSchema.countDocuments({});
      res.status(200).json({ count: staffCount });
  } catch (error) {
    console.error('Error fetching student count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function userCount(req, res) {
  try {
    const userCount = await userSchema.countDocuments({});
      res.status(200).json({ count: userCount });
  } catch (error) {
    console.error('Error fetching student count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Courses add section