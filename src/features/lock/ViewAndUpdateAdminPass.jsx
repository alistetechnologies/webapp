/** @format */

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { adminPasswordApi } from "./api";
import { token } from "@/constants/config";
import { Spinner } from "react-bootstrap";

export default function ViewAndUpdateAdminPass({
	showModal,
	setShowModal,
	password,
	lockId,
	setPassword,
}) {
	const [editMode, setEditMode] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		if (newPassword !== confirmPassword) {
			setError("Passwords do not match");
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
		if (!res || !res?.data?.success) {
			setShowModal(false);
			setEditMode(false);
			return;
		}
		console.log(res);
        setPassword(newPassword)
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
	// 1194379
	return (
		<>
			{showModal && (
				<>
					<div className="fixed inset-0 bg-black/50 z-40"></div>

					<div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">
						<h2 className="text-xl font-semibold mb-4">
							Admin Password Settings
						</h2>

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
								<div className="mb-3">
									<label className="block text-sm font-medium mb-1">
										Enter New Password
									</label>
									<input
										type="password"
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
										className="w-full px-3 py-2 border rounded"
									/>
								</div>

								<div className="mb-3">
									<label className="block text-sm font-medium mb-1">
										Confirm Password
									</label>
									<input
										type="password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="w-full px-3 py-2 border rounded"
									/>
								</div>

								{error && <p className="text-red-500 text-sm mb-2">{error}</p>}
								{loading && <Spinner className="w-5 h-5 text-blue-500" />}
								<div className="flex justify-end space-x-2">
									<Button
										className="cursor-pointer"
										disabled={loading}
										onClick={handleSubmit}>
										Submit
									</Button>
									<Button
										variant="error"
										disabled={loading}
										onClick={() => {
											setEditMode(false);
											setNewPassword("");
											setConfirmPassword("");
											setError("");
										}}
										className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">
										Back
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
