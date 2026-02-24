// components/espace-mpme/ProfileHeader.tsx
import React, { Component, createRef, RefObject } from "react";
import { toast } from "react-toastify";

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  companyName?: string;
  province?: string;
  phone?: string;
  initialPhotoUrl?: string | null;
  size?: "sm" | "md" | "lg";
  showMeta?: boolean;
  onPhotoUpdate?: (photoUrl: string) => void;
}

interface ProfileHeaderState {
  photoPreview: string | null;
  uploading: boolean;
  uploadError: string | null;
}

class ProfileHeader extends Component<ProfileHeaderProps, ProfileHeaderState> {
  private fileInputRef: RefObject<HTMLInputElement>;

  static defaultProps = {
    size: "md",
    showMeta: true,
    initialPhotoUrl: null,
  };

  constructor(props: ProfileHeaderProps) {
    super(props);
    this.fileInputRef = createRef<HTMLInputElement>();

    this.state = {
      photoPreview: props.initialPhotoUrl || null,
      uploading: false,
      uploadError: null,
    };
  }

  // ==================== MÉTHODES DE VALIDATION ====================

  validatePhoto = (file: File): string | null => {
    // Formats acceptés
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return "Format non supporté. Utilisez JPG, PNG ou GIF.";
    }

    // Taille maximale (5 Mo)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return "La photo ne doit pas dépasser 5 Mo.";
    }

    return null;
  };

  // ==================== MÉTHODES DE GESTION DE FICHIER ====================

  createFormData = (file: File): FormData => {
    const formData = new FormData();
    formData.append("photo", file);
    return formData;
  };

  readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // ==================== MÉTHODES D'UPLOAD ====================

  uploadPhotoToServer = async (file: File): Promise<string> => {
    // Simulation d'upload (à remplacer par votre vrai service API)
    return new Promise((resolve) => {
      setTimeout(() => {
        // Ici vous feriez normalement :
        // const response = await profilService.uploadProfilePhoto(formData);
        // resolve(response.data.photoUrl);

        // Simulation : on retourne une URL factice
        resolve(URL.createObjectURL(file));
      }, 1500);
    });
  };

  deletePhotoFromServer = async (): Promise<void> => {
    // Simulation de suppression (à remplacer par votre vrai service API)
    return new Promise((resolve) => {
      setTimeout(() => {
        // await profilService.deleteProfilePhoto();
        resolve();
      }, 500);
    });
  };

  // ==================== MÉTHODES PRINCIPALES ====================

  handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Validation
    const validationError = this.validatePhoto(file);
    if (validationError) {
      this.setState({ uploadError: validationError });
      toast.error(validationError);
      setTimeout(() => this.setState({ uploadError: null }), 3000);
      return;
    }

    try {
      // 2. Afficher le preview immédiatement
      this.setState({ uploading: true, uploadError: null });
      const previewUrl = await this.readFileAsDataURL(file);
      this.setState({ photoPreview: previewUrl });

      // 3. Upload vers le serveur
      const photoUrl = await this.uploadPhotoToServer(file);

      // 4. Mise à jour réussie
      this.setState({ uploading: false });
      toast.success("Photo de profil mise à jour avec succès");

      // 5. Notifier le parent si nécessaire
      if (this.props.onPhotoUpdate) {
        this.props.onPhotoUpdate(photoUrl);
      }
    } catch (error) {
      console.error("Erreur upload:", error);
      this.setState({
        uploading: false,
        uploadError: "Échec de l'upload. Veuillez réessayer.",
        photoPreview: this.props.initialPhotoUrl || null, // Revenir à la photo précédente
      });
      toast.error("Échec de l'upload. Veuillez réessayer.");
    }
  };

  handleRemovePhoto = async () => {
    if (!this.state.photoPreview) return;

    try {
      this.setState({ uploading: true, uploadError: null });

      // 1. Supprimer du serveur
      await this.deletePhotoFromServer();

      // 2. Mise à jour de l'état local
      this.setState({
        photoPreview: null,
        uploading: false,
      });

      toast.success("Photo de profil supprimée");

      // 3. Notifier le parent
      if (this.props.onPhotoUpdate) {
        this.props.onPhotoUpdate("");
      }
    } catch (error) {
      console.error("Erreur suppression:", error);
      this.setState({
        uploading: false,
        uploadError: "Impossible de supprimer la photo",
      });
      toast.error("Impossible de supprimer la photo");
    }
  };

  triggerFileInput = () => {
    this.fileInputRef.current?.click();
  };

  resetFileInput = () => {
    if (this.fileInputRef.current) {
      this.fileInputRef.current.value = "";
    }
  };

  // ==================== MÉTHODES DE STYLE ====================

  getSizeStyles = () => {
    const { size } = this.props;
    switch (size) {
      case "sm":
        return {
          containerSize: 70,
          iconSize: 24,
          fontSize: 22,
          uploadBtnSize: 26,
          removeBtnSize: 20,
        };
      case "lg":
        return {
          containerSize: 130,
          iconSize: 36,
          fontSize: 42,
          uploadBtnSize: 36,
          removeBtnSize: 28,
        };
      default: // md
        return {
          containerSize: 100,
          iconSize: 28,
          fontSize: 32,
          uploadBtnSize: 32,
          removeBtnSize: 24,
        };
    }
  };

  // ==================== RENDU ====================

  render() {
    const { firstName, lastName, companyName, province, phone, showMeta } =
      this.props;
    const { photoPreview, uploading, uploadError } = this.state;
    const sizes = this.getSizeStyles();

    return (
      <div className="candidate-data">
        <div className="candidate-img">
          <div
            className="profile-avatar-container"
            style={{ width: sizes.containerSize, height: sizes.containerSize }}
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt={`${firstName} ${lastName}`}
                className="profile-avatar"
              />
            ) : (
              <div
                className="avatar-circle"
                style={{ fontSize: sizes.fontSize }}
              >
                {firstName?.charAt(0)}
                {lastName?.charAt(0)}
              </div>
            )}

            <input
              ref={this.fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={this.handlePhotoUpload}
              onClick={this.resetFileInput}
              style={{ display: "none" }}
            />

            <button
              type="button"
              className="avatar-upload-btn"
              onClick={this.triggerFileInput}
              title="Changer la photo"
              style={{
                width: sizes.uploadBtnSize,
                height: sizes.uploadBtnSize,
                fontSize: sizes.iconSize / 2,
              }}
              disabled={uploading}
            >
              <i className="ti ti-camera" />
            </button>

            {photoPreview && !uploading && (
              <button
                type="button"
                className="avatar-remove-btn"
                onClick={this.handleRemovePhoto}
                title="Supprimer la photo"
                style={{
                  width: sizes.removeBtnSize,
                  height: sizes.removeBtnSize,
                  fontSize: sizes.iconSize / 3,
                }}
              >
                <i className="ti ti-close" />
              </button>
            )}
          </div>

          {uploading && (
            <div
              className="upload-progress"
              style={{
                width: sizes.containerSize,
                height: sizes.containerSize,
              }}
            >
              <div className="progress-spinner" />
              <span>Upload...</span>
            </div>
          )}

          {uploadError && (
            <div className="upload-error">
              <i className="ti ti-alert" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>

        {/* <div className="candidate-caption">
          <h5>
            {firstName} {lastName}
          </h5>
          {companyName && (
            <span className="">{companyName}</span>
          )}

          {showMeta && (
            <div className="profile-meta">
              {province && (
                <span className="meta-item">
                  <i className="ti ti-location-pin" />
                  {province}
                </span>
              )}
              {phone && (
                <span className="meta-item">
                  <i className="ti ti-headphone" />
                  {phone}
                </span>
              )}
            </div>
          )}
        </div> */}

        <div className="candidate-caption">
          <h5>
            {firstName} {lastName}
          </h5>
          <span>{companyName}</span>
          <div className="meta-line">
            <span>
              <i className="ti ti-location-pin" /> {province}
            </span>
            <span>
              <i className="ti ti-headphone" /> {phone}
            </span>
          </div>
        </div>

        <style>{`
          .profile-avatar-container {
            position: relative;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            // overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          .avatar-circle {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: 700;
            color: #fff;
            background: var(--theme-SkinColor, #1f4e79);
            text-transform: uppercase;
          }

          .profile-avatar {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .avatar-upload-btn {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: var(--theme-SkinColor, #1f4e79);
            border: 2px solid #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 2;
          }

          .avatar-upload-btn:hover {
            background: var(--theme-SkinColor-dark, #0f2540);
            transform: scale(1.1);
          }

          .avatar-upload-btn i {
            color: #fff;
            font-size: 14px;
          }

          .avatar-remove-btn {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #dc3545;
            border: 2px solid #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            opacity: 0;
            transform: scale(0.8);
          }

          .profile-avatar-container:hover .avatar-remove-btn {
            opacity: 1;
            transform: scale(1);
          }

          .avatar-remove-btn:hover {
            background: #bd2130;
          }

          .avatar-remove-btn i {
            color: #fff;
            font-size: 12px;
          }

          // .upload-progress {
          //   position: absolute;
          //   top: 0;
          //   left: 0;
          //   right: 0;
          //   bottom: 0;
          //   background: rgba(255, 255, 255, 0.9);
          //   border-radius: 50%;
          //   display: flex;
          //   flex-direction: column;
          //   align-items: center;
          //   justify-content: center;
          //   z-index: 3;
          // }

          // .progress-spinner {
          //   width: 30px;
          //   height: 30px;
          //   border: 3px solid #f3f3f3;
          //   border-top: 3px solid var(--theme-SkinColor, #1f4e79);
          //   border-radius: 50%;
          //   animation: spin 1s linear infinite;
          //   margin-bottom: 5px;
          // }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .upload-progress span {
            font-size: 10px;
            color: #666;
          }

          .upload-error {
            position: absolute;
            top: 110%;
            left: 0;
            right: 0;
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 4px;
            padding: 5px 10px;
            font-size: 11px;
            color: #721c24;
            display: flex;
            align-items: center;
            gap: 5px;
            white-space: nowrap;
            z-index: 10;
          }

          .upload-error i {
            font-size: 12px;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .upload-error {
            animation: slideDown 0.3s ease;
          }

          .gps-input-group {
            display: flex;
            gap: 10px;
          }

          .gps-btn {
            width: 50px;
            height: 50px;
            border: 1px solid #dee2e6;
            border-radius: 6px;
            background: #f8f9fa;
            color: var(--theme-SkinColor, #1f4e79);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
          }

          .gps-btn:hover {
            background: var(--theme-SkinColor, #1f4e79);
            color: #fff;
          }

          .success-message {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 18px;
            background: #e8f5ee;
            border: 1px solid #2e7d52;
            border-radius: 6px;
            margin-bottom: 20px;
          }

          .success-message i {
            color: #2e7d52;
            font-size: 18px;
          }

          .success-message span {
            font-size: 13px;
            font-weight: 600;
            color: #2e7d52;
          }

          .checkbox-label {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
          }

          .checkbox-label input[type="checkbox"] {
            display: none;
          }

          .checkbox-custom {
            width: 18px;
            height: 18px;
            border: 2px solid #dee2e6;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
          }

          .checkbox-custom i {
            font-size: 12px;
            color: #fff;
            opacity: 0;
          }

          .checkbox-label input:checked + .checkbox-custom {
            background: var(--theme-SkinColor, #1f4e79);
            border-color: var(--theme-SkinColor, #1f4e79);
          }

          .checkbox-label input:checked + .checkbox-custom i {
            opacity: 1;
          }

          .checkbox-text {
            font-size: 13px;
            color: #495057;
          }
        `}</style>
      </div>
    );
  }
}

export default ProfileHeader;
