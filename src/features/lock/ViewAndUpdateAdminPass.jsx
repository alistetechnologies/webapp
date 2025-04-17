/** @format */

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { adminPasswordApi } from "./api";
import { token } from "@/constants/config";
import { Spinner } from "react-bootstrap";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import "./viewAndUpdate.css"

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
		if (
			res.success &&
			res.errmsg !== "" &&
			res.errmsg !== "none error message or means yes"
		) {
			toast.error(res.errmsg);
		}
		if (!res || !res?.data?.success) {
			setShowModal(false);
			setEditMode(false);
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
						<div className="cursor-pointer flex items-center gap-[4px]">
							{editMode && <div
								disabled={loading}
								onClick={() => {
									setEditMode(false);
									setNewPassword("");
									setConfirmPassword("");
									setError("");
								}}
								className="mb-[20px]">
								<ArrowBack />
							</div>}
							<h2 className="text-xl font-semibold mb-4">
								Admin Password Settings
							</h2>
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
									<Button
										className="cursor-pointer"
										onClick={() => setEditMode(true)}>
										Edit
									</Button>
									<Button
										className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
										onClick={closeModal}>
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
										onClick={() => setShow(!show)}>
										{show ? <VisibilityOff /> : <Visibility />}
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
										onClick={() => setShowPassword(!showPassword)}>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</span>
								</div>

								{error && <p className="text-red-500 text-sm mb-2">{error}</p>}
								{loading && <Spinner className="w-5 h-5 text-blue-500" />}
								<div className="flex justify-between space-x-2">
									<Button
										className="cursor-pointer"
										disabled={loading}
										onClick={() => {
											let pass = Math.floor(Math.random() * 1e6);
											pass = String(pass);
											console.log(pass);
											if (pass.length != 6) {
												return;
											}
											setNewPassword(String(pass));
											setConfirmPassword(String(pass));
										}}>
										Generate Password
									</Button>
									<Button
										className="cursor-pointer"
										disabled={loading}
										onClick={handleSubmit}>
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
