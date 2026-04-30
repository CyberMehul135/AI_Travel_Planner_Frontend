import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Mail,
  MapPin,
  Phone,
  Pencil,
  Check,
  X,
  User,
  Shield,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { toast as toastify } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserDetails, updateUserDetails } from "../user.service";
import { formatDateToMonthDDYYYY } from "@/shared/utils/formatDate";

export const Profile = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState({});

  const { data, loading, err } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => getUserDetails(),
    staleTime: 10000,
  });

  const userUpdateMutation = useMutation({
    mutationFn: (payload) => updateUserDetails(payload),
    onSuccess: (data) => {
      toast.success("Your changes have been saved.");
      setEditing(false);
      setError({});
    },
    onError: (err) => {
      toastify.error(err.response.data.message);
      setError(err.response.data.errors.reduce((acc, err) => {
        acc[err.field] = err.message;
        return acc;
      }, {}));
    },
  });

  useEffect(() => {
    if (data?.user) {
      setProfile(data.user);
      setDraft(data.user);
    }
  }, [data]);

  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", draft.name);
    formData.append("phone", draft.phone);
    formData.append("location", draft.location);
    formData.append("bio", draft.bio);
    if (file) {
      formData.append("avtar", file);
    }
    userUpdateMutation.mutate(formData);

    setProfile(draft);

  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();

    reader.onloadend = () => {
      const url = reader.result;

      if (editing) {
        setDraft((d) => ({ ...d, avtar: url }));
      } else {
        setProfile((p) => ({ ...p, avtar: url }));
      }
    };

    reader.readAsDataURL(selectedFile);

    // DIRECT UPLOAD (API call)
    const formData = new FormData();
    formData.append("avtar", selectedFile);

    userUpdateMutation.mutate(formData, {
      onSuccess: (data) => {
        const updatedUser = data?.data?.updatedUser;

        setProfile(updatedUser);
        setDraft(updatedUser);

      },
      onError: () => {
        toast.error("Image upload failed");
      },
    });
  };

  const currentData = editing ? draft : profile;

  if (loading) return <p>Loading...</p>;
  if (err) return <p>Error : {err?.response?.data?.message}</p>;
  if (data) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 pb-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">My Profile</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your personal information
            </p>
          </div>
          {!editing ? (
            <Button
              onClick={() => {
                setDraft(profile);
                setEditing(true);
                setError({})
              }}
              className="gradient-btn rounded-2xl px-6 gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="rounded-2xl px-5 gap-2 border-border"
              >
                <X className="w-4 h-4" /> Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="gradient-btn rounded-2xl px-5 gap-2"
              >
                <Check className="w-4 h-4" /> Save
              </Button>
            </div>
          )}
        </motion.div>

        {/* Hero banner + avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border overflow-hidden rounded-lg"
        >
          {/* Banner */}
          <div
            className="h-36 w-full relative"
            style={{ background: "var(--gradient-primary)" }}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-60" />
          </div>

          {/* Avatar + info */}
          <div className="px-8 pb-8 -mt-16 relative">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              {/* Avatar */}
              <div className="relative group shrink-0">
                <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-background bg-secondary flex items-center justify-center shadow-xl">
                  {currentData?.avtar ? (
                    <img
                      src={currentData.avtar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-14 h-14 text-muted-foreground" />
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl gradient-btn flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 max-md:opacity-100"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              {/* Name + badge */}
              <div className="flex-1 min-w-0 pb-1">
                {editing ? (
                  <>
                    <Input
                      value={draft?.name}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, name: e.target.value }))
                      }
                      className="text-2xl font-bold h-12 max-w-sm bg-secondary/50 border-primary/30 rounded-xl"
                    />
                    {error?.name && <p className="text-destructive text-xs ml-2 font-medium">{error?.name}</p>}
                  </>
                ) : (

                  <h2 className="text-2xl font-bold truncate">
                    {profile?.name}
                  </h2>


                )}
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/15 text-primary font-medium flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Free Plan
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Joined{" "}
                    {formatDateToMonthDDYYYY(profile?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card/50 rounded-lg border p-6 space-y-5"
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4" /> Contact Info
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">
                  Email Address
                </label>

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-sm font-medium truncate">
                    {profile?.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">
                  Phone Number
                </label>
                {editing ? (
                  <>
                    <Input
                      value={draft?.phone}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, phone: e.target.value }))
                      }
                      className="bg-secondary/50 border-primary/30 rounded-xl"
                    />
                    {error?.phone && <p className="text-destructive text-xs font-medium">{error?.phone}</p>}
                  </>

                ) : (

                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <p className="text-sm font-medium truncate">
                      {profile?.phone}
                    </p>
                  </div>


                )}
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">
                  Location
                </label>
                {editing ? (
                  <>
                    <Input
                      value={draft?.location}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, location: e.target.value }))
                      }
                      className="bg-secondary/50 border-primary/30 rounded-xl"
                    />
                    {error?.location && <p className="text-destructive text-xs font-medium">{error?.location}</p>}
                  </>
                ) : (

                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <p className="text-sm font-medium truncate">
                      {profile?.location}
                    </p>
                  </div>


                )}
              </div>
            </div>
          </motion.div>

          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card/50 border rounded-lg p-6 space-y-5"
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" /> About Me
            </h3>

            {editing ? (
              <>
                <Textarea
                  value={draft?.bio}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, bio: e.target.value }))
                  }
                  className="bg-secondary/50 border-primary/30 rounded-xl min-h-[140px]"
                  placeholder="Tell us about yourself..."
                />
                {error?.bio && <p className="text-destructive text-xs font-medium">{error?.bio}</p>}
              </>
            ) : (

              <p className="text-sm text-muted-foreground leading-relaxed">
                {profile?.bio}
              </p>


            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-xl font-bold gradient-text">3</p>
                <p className="text-xs text-muted-foreground mt-0.5">Trips</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold gradient-text">5</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Countries
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold gradient-text">12</p>
                <p className="text-xs text-muted-foreground mt-0.5">Days</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
};
