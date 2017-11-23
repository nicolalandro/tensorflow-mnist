import tensorflow as tf


def regr(x):
    m = tf.Variable(0.0, name="m")
    q = tf.Variable(0.0, name="q")
    hypothesis = m * x + q
    return hypothesis, [m, q]
