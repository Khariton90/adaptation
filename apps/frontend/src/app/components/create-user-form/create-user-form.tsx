import { FormControl, InputLabel, Input, Select, MenuItem, Button, SelectChangeEvent } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { UserDto, jobTitleList } from "../../types/consts";
import { JobTitle } from "@org/shared-types";
import { useAppDispatch } from "../../hooks";
import { createNewUser, uploadAvatar } from "../../store/api-actions";
import dayjs from "dayjs";
import { PreviewAvatar } from "../preview-avatar/preview-avatar";
import "./create-user-form.scss";

export function CreateUserForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<Blob | undefined>();
  const [preview, setPreview] = useState<string | undefined>();

  const [form, setForm] = useState<UserDto>({
    firstname: "",
    lastname: "",
    avatar: selectedFile ? selectedFile.name.toString() : "",
    email: "",
    jobTitle: JobTitle.Manager,
    startDate: dayjs().toDate().toISOString(),
  })

  useEffect(() => {

    if (!selectedFile) {
      setPreview(undefined);
      return
    }

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
      setForm((prevForm) => ({...prevForm, avatar: selectedFile.name}))
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [selectedFile, dispatch])

  const handleChangeForm = (evt: ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({ ...prevForm, [evt.target.name]: evt.target.value }));
  }

  const handleChangeSelect = (evt: SelectChangeEvent) => {
    setForm((prevForm) => ({ ...prevForm, [evt.target.name]: evt.target.value }));
  }

  const handleSetPreviewImage = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files || evt.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    if (evt.target.files) {
      setSelectedFile(evt.target.files[0]);
    }
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
      dispatch(uploadAvatar(formData));
    }

    dispatch(createNewUser(form));
  }

  const onRemoveImage = () => {
    if (selectedFile) {
      setSelectedFile(undefined);
      setPreview(undefined);
    }
  }

  return (
    <form className="create-user-form" autoComplete="off" onSubmit={handleSubmit}>
      <div className="create-user-form__left">
        <input
          name="avatar"
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleSetPreviewImage}
        />
        <PreviewAvatar preview={preview} onRemoveImage={onRemoveImage}/>
      </div>
      <div className="create-user-form__right">
        <FormControl variant="standard" color="success">
          <InputLabel htmlFor="user-firstname" required>Имя</InputLabel>
          <Input
            id="user-firstname"
            value={form.firstname}
            name="firstname"
            required
            onChange={handleChangeForm}
          />
        </FormControl>
        <FormControl variant="standard" color="success">
          <InputLabel htmlFor="user-lastname" required>Фамилия</InputLabel>
          <Input
            id="user-lastname"
            value={form.lastname}
            name="lastname"
            required
            onChange={handleChangeForm}
          />
        </FormControl>
        <FormControl variant="standard" required color="success">
          <InputLabel htmlFor="user-email">E-mail</InputLabel>
          <Input
            id="user-email"
            value={form.email}
            name="email"
            type="email"
            required
            onChange={handleChangeForm}
          />
        </FormControl>

        <FormControl fullWidth color="success">
          <InputLabel id="job-title-label" required>Должность</InputLabel>
          <Select
            id="job-title-select"
            value={form.jobTitle}
            name="jobTitle"
            labelId="job-title-select"
            label="Должность"
            required
            onChange={handleChangeSelect}
          >
            {
              Object.entries(jobTitleList).map(([key, value]) => <MenuItem
                key={'job' + key}
                value={key}>{value}
              </MenuItem>)
            }
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DatePicker label="Дата начала обучения *"
              value={dayjs(form.startDate)}
              onChange={(newValue) => setForm((prevForm) => ({ ...prevForm, startDate: dayjs(newValue).toISOString() }))} />
          </LocalizationProvider>
        </FormControl>

        <Button variant="contained" color="success" type="submit" onSubmit={handleSubmit}>Сохранить</Button>
      </div>
    </form>
  )
}