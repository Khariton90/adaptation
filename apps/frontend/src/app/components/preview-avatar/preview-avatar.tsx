import { Button } from "@mui/material";
import cn from "classnames";
import "./preview-avatar.scss";

type PreviewAvatarProps = {
  preview: string | undefined;
  onRemoveImage: () => void;
}

const DEFAULT_AVATAR = "http://localhost:3333/api/users/avatar/default-avatar.svg";

export function PreviewAvatar({ preview, onRemoveImage }: PreviewAvatarProps): JSX.Element {
  return (
    <>
    
      <div className={cn("preview-avatar", {"active": preview})}>
      <div className="delete-icon" onClick={onRemoveImage} title="Удалить"></div>
        <img src={preview || DEFAULT_AVATAR} alt="Аватар" />
      </div>
      <label htmlFor="raised-button-file">
        <Button component="span">Загрузить</Button>
      </label>
    </>
  )
}