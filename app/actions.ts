"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const addEntityAction = async (entityData: any) => {
  const supabase = await createClient();

  try {
    const { data: returnedData } = await supabase
      .from("entitati")
      .insert({
        address: entityData.address,
        type: entityData.type,
        phoneNumber: entityData.phoneNumber,
        email: entityData.email,
      })
      .select();

    if (entityData.type === 0 && returnedData) {
      console.log("TEST PERSOANA");
      const insertedData = await supabase.from("persoane").insert({
        id: returnedData[0].id,
        cnp: entityData.CNP,
        name: entityData.name,
        birthDate: entityData.birthDate,
      });

      console.log(insertedData);
    } else if (entityData.type === 1 && returnedData) {
      await supabase.from("firme").insert({
        id: returnedData[0].id,
        cui: entityData.CUI,
        name: entityData.name,
        numberOfWorkers: entityData.numberOfWorkers,
      });
    }
  } catch (error) {
    console.error("Eroare la adaugarea unei entitati!");
    throw error;
  }

  return redirect("/");
};

export const addImpozitAction = async (impozitData: any) => {
  const supabase = await createClient();

  console.log(impozitData);

  try {
    const { data: returnedData, error } = await supabase
      .from("impozite")
      .insert({
        entity_id: impozitData.selectedEntityID,
        amount: impozitData.amount,
        payDate: impozitData.payDate,
        taxType: impozitData.taxType,
        status: impozitData.status,
        paymentMethod: impozitData.paymentMethod,
      })
      .select();

    console.log(returnedData, error);
  } catch (error) {
    console.error("Eroare la adaugarea unei entitati!");
    throw error;
  }

  return redirect("/");
};
