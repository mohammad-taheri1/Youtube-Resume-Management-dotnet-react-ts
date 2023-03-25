import { useState, useEffect } from "react";
import "./candidates.scss";
import { ICompany, ICreateCandidateDto, ICreateCompanyDto, ICreateJobDto, IJob } from "../../types/global.typing";

import TextField from "@mui/material/TextField/TextField";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const AddCandidate = () => {
   const [candidate, setCandidate] = useState<ICreateCandidateDto>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      coverLetter: "",
      jobId: "",
   });
   const [jobs, setJobs] = useState<IJob[]>([]);
   const [pdfFile, setPdfFile] = useState<File | null>();

   const redirect = useNavigate();

   useEffect(() => {
      httpModule
         .get<IJob[]>("/Job/Get")
         .then((response) => {
            setJobs(response.data);
         })
         .catch((error) => {
            alert("Error");
            console.log(error);
         });
   }, []);

   const handleClickSaveBtn = () => {
      if (
         candidate.firstName === "" ||
         candidate.lastName === "" ||
         candidate.email === "" ||
         candidate.phone === "" ||
         candidate.coverLetter === "" ||
         candidate.jobId === "" ||
         !pdfFile
      ) {
         alert("Fill all fields");
         return;
      }
      const newCandidateFormData = new FormData();
      newCandidateFormData.append("firstName", candidate.firstName);
      newCandidateFormData.append("lastName", candidate.lastName);
      newCandidateFormData.append("email", candidate.email);
      newCandidateFormData.append("phone", candidate.phone);
      newCandidateFormData.append("coverLetter", candidate.coverLetter);
      newCandidateFormData.append("jobId", candidate.jobId);
      newCandidateFormData.append("pdfFile", pdfFile);
      httpModule
         .post("/Candidate/Create", newCandidateFormData)
         .then((responst) => redirect("/candidates"))
         .catch((error) => console.log(error));
   };

   const handleClickBackBtn = () => {
      redirect("/candidates");
   };

   return (
      <div className="content">
         <div className="add-candidate">
            <h2>Add New Candidate</h2>
            <FormControl fullWidth>
               <InputLabel>Job</InputLabel>
               <Select
                  value={candidate.jobId}
                  label="Job"
                  onChange={(e) => setCandidate({ ...candidate, jobId: e.target.value })}
               >
                  {jobs.map((item) => (
                     <MenuItem key={item.id} value={item.id}>
                        {item.title}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <TextField
               autoComplete="off"
               label="First Name"
               variant="outlined"
               value={candidate.firstName}
               onChange={(e) => setCandidate({ ...candidate, firstName: e.target.value })}
            />
            <TextField
               autoComplete="off"
               label="Last Name"
               variant="outlined"
               value={candidate.lastName}
               onChange={(e) => setCandidate({ ...candidate, lastName: e.target.value })}
            />
            <TextField
               autoComplete="off"
               label="Email"
               variant="outlined"
               value={candidate.email}
               onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
            />
            <TextField
               autoComplete="off"
               label="Phone"
               variant="outlined"
               value={candidate.phone}
               onChange={(e) => setCandidate({ ...candidate, phone: e.target.value })}
            />
            <TextField
               autoComplete="off"
               label="C V"
               variant="outlined"
               value={candidate.coverLetter}
               onChange={(e) => setCandidate({ ...candidate, coverLetter: e.target.value })}
               multiline
            />
            <input type="file" onChange={(event) => setPdfFile(event.target.files ? event.target.files[0] : null)} />

            <div className="btns">
               <Button variant="outlined" color="primary" onClick={handleClickSaveBtn}>
                  Save
               </Button>
               <Button variant="outlined" color="secondary" onClick={handleClickBackBtn}>
                  Back
               </Button>
            </div>
         </div>
      </div>
   );
};

export default AddCandidate;
