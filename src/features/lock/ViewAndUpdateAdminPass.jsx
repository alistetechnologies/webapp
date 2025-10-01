import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { adminPasswordApi } from "./api";
import { token } from "@/constants/config";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import "./viewAndUpdate.css";

export default function ViewAndUpdateAdminPass({
	showModal,
	setShowModal,
	password,
	lockId,
}) {
	const [editMode, setEditMode] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async () => {
		if (newPassword !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}
		if (newPassword.length !== 6) {
			setError("Password must be 6 digits");
			return;
		}
		setError("");
		setLoading(true);
		const res = await adminPasswordApi(
			"setAdminPasscode",
			{
				lockId: lockId,
				adminPassword: newPassword,
			},
			token
		);
		setLoading(false);

		if (res.success && res.errmsg && res.errmsg !== "none error message or means yes") {
			toast.error(res.errmsg);
			return;
		}

		setShowModal(false);
		setEditMode(false);
		setNewPassword("");
		setConfirmPassword("");
	};

	const closeModal = () => {
		setShowModal(false);
		setEditMode(false);
		setNewPassword("");
		setConfirmPassword("");
		setError("");
	};

	return (
		<>
			{showModal && (
				<>
					<div className="fixed inset-0 bg-black/50 z-40"></div>

					<div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">
						<div className="flex items-center gap-2 mb-4">
							{editMode && (
								<button
									disabled={loading}
									onClick={() => {
										setEditMode(false);
										setNewPassword("");
										setConfirmPassword("");
										setError("");
									}}
									className="p-1 hover:bg-gray-100 rounded"
								>
									<FiArrowLeft size={20} />
								</button>
							)}
							<h2 className="text-xl font-semibold">Admin Password Settings</h2>
						</div>
						{!editMode ? (
							<>
								<div className="mb-4">
									<label className="block text-sm font-medium mb-1">
										Admin Password
									</label>
									<div className="w-full px-3 py-2 border rounded bg-gray-100">
										{password}
									</div>
								</div>

								<div className="flex justify-end space-x-2">
									<Button onClick={() => setEditMode(true)}>Edit</Button>
									<Button
										variant="secondary"
										className="bg-red-600 hover:bg-red-700 text-white"
										onClick={closeModal}
									>
										Close
									</Button>
								</div>
							</>
						) : (
							<>
								<div className="mb-3 relative">
									<label className="block text-sm font-medium mb-1">
										New Password
									</label>
									<input
										type={show ? "text" : "password"}
										value={newPassword}
										onChange={(e) => {
											if (e.target.value[0] === "0") {
												setError("Password can't start with 0");
												return;
											} else {
												setError("");
											}
											setNewPassword(e.target.value);
										}}
										className="w-full px-3 py-2 pr-10 border rounded"
									/>
									<span
										className="absolute right-3 top-8 cursor-pointer text-gray-600"
										onClick={() => setShow(!show)}
									>
										{show ? <FiEyeOff /> : <FiEye />}
									</span>
								</div>

								<div className="mb-3 relative">
									<label className="block text-sm font-medium mb-1">
										Confirm Password
									</label>
									<input
										type={showPassword ? "text" : "password"}
										value={confirmPassword}
										onChange={(e) => {
											if (e.target.value[0] === "0") {
												setError("Password can't start with 0");
												return;
											} else {
												setError("");
											}
											setConfirmPassword(e.target.value);
										}}
										className="w-full px-3 py-2 pr-10 border rounded"
									/>
									<span
										className="absolute right-3 top-8 cursor-pointer text-gray-600"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? <FiEyeOff /> : <FiEye />}
									</span>
								</div>

								{error && <p className="text-red-500 text-sm mb-2">{error}</p>}

								{loading && (
									<div className="flex justify-center mb-2">
										<div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
									</div>
								)}

								<div className="flex justify-between space-x-2">
									<Button
										className="cursor-pointer"
										disabled={loading}
										onClick={() => {
											let pass = Math.floor(Math.random() * 1e6);
											pass = String(pass).padStart(6, "0");
											setNewPassword(pass);
											setConfirmPassword(pass);
										}}
									>
										Generate Password
									</Button>
									<Button
										className="cursor-pointer"
										disabled={loading}
										onClick={handleSubmit}
									>
										Submit
									</Button>
								</div>
							</>
						)}
					</div>
				</>
			)}
		</>
	);
}
