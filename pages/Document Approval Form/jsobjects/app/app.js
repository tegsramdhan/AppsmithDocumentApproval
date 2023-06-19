export default {
	getAppsmithConfig : async ()=>{
		await GetAppsmithConfig.run();
		GetAppsmithConfig.data.forEach((obj) => {
			storeValue(obj.KeyName.toString(), obj.Value, true);
		})
	},
	uploadFile : async ()=>{
		let supabaseClient = supabase.createClient(appsmith.store.docApprovalAPIURL, appsmith.store.docApprovalAPIKey);

		function binaryToArrayBuffer(binary) {
			var bytes = new Uint8Array(binary.length);
			for (var i = 0; i < binary.length; i++) {
				bytes[i] = binary.charCodeAt(i);
			}
			return bytes.buffer;
		}

		FilePicker_Attachments.files.forEach(async (obj) =>{
			var binaryString = obj.data;
			const avatarFile = binaryToArrayBuffer(binaryString);
			const resUpload = await supabaseClient
			.storage
			.from('bucket_documentApproval')
			.upload(obj.name, avatarFile);
			console.log(resUpload);
		});

	}
}